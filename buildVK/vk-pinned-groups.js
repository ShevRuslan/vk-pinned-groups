window.addEventListener('DOMContentLoaded', () => {

    const sidebar = document.querySelector('#side_bar_inner');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper-icons-group');    
    sidebar.appendChild(wrapper);

class Request {
    constructor() {
        this.token = config.access_token;
        this.api_url = config.api_url;
    }
    createRequest(method, config, token) {
        let url = this.api_url + method + '?';
        for (const param in config) {
            let stringParam =`${param}=${config[param]}`;
            stringParam += '&';
            url += stringParam;
        }
        url += `access_token=${token}&`

        return url;
    }
    async request({method, config}) {
        const url = this.createRequest(method, config, this.token);
        const data = new FormData();
        data.set('url', url);
        let response = null;
        response = await fetch(url, {
                method: 'GET',
            });
        return await response.json();
    }
}


const req = new Request();


class VkPinnedGroups {
    constructor() {
        this.defaultIDS = '76746437,howdyho_net,ovsyanochan,forwebdev,marvel';
        this.groups = null;
        this.init();
    }
    async getGroups(ids) {
        const lsGroups = localStorage.getItem('groups');
        if (lsGroups === null) {
            const groups = await req.request({
                method: 'groups.getById',
                config: {
                    'group_ids': ids || this.defaultIDS,
                    'fields': 'links,members_count,status',
                    'v': '5.95'
                }
            });
            console.log(groups.response);
            this.groups = groups.response
            this.save(this.groups);
        }
        else {
            this.groups = JSON.parse(lsGroups);
        }
    }
    viewGroups(groups) {
        const wrapperGroups = document.querySelector('.wrapper-icons-group');
        if (wrapperGroups.children.length >= 1) {
            wrapperGroups.innerHTML = '';
        }
        groups.forEach(Group => {
            const wrap = document.createElement('div');
            wrap.classList.add('group');
            wrap.innerHTML =
                `<a href="https://vk.com/${Group.screen_name}" target="_blank">
                    <img src="${Group.photo_50}"/>
                    <p>${Group.name}</p>
                </a>`;
            wrapperGroups.appendChild(wrap);
        })
    }
    dropdownVKTemplate() {
        let head_nav_btns = document.querySelector('.head_nav');
        let top_notify_btn = document.querySelector('.head_nav_btns');

        if (head_nav_btns && top_notify_btn && document.querySelector('.settings-groups-control') === null) {
            const openDropdown = document.createElement('div');
            const dropdown = document.createElement('div');    
            dropdown.innerHTML = this.getDropdownTemplate(this.groups.length);
            openDropdown.appendChild(dropdown);
            openDropdown.classList.add('head_nav_item', 'fl_l', 'settings-groups-control')


            const settingsElements = {
                addElement:    dropdown.querySelector('.add-new-group'),
                updateElement: dropdown.querySelector('.update-groups'),
                removeElement: dropdown.querySelector('.remove-groups'),
                offElement:    dropdown.querySelector('.off-libs'),
            }
            this.eventDropdown(settingsElements);
            head_nav_btns.insertBefore(openDropdown, top_notify_btn);

        }
    }
    getDropdownTemplate(count) {
        return `
        <span class="option_name">VKPinnedGroups</span>
        <div class="tt_w tt_default tt_up settings-groups">
            <div class="wrapped">
                <div class="notify_sources_tt_content">
                    <div class="content">
                        <div class="line_cell clear_fix ui_rmenu_item_sel">
                            <div class="option_name">Количество групп <a class="count">${count}</a></div>
                        </div>
                        <div class="line_cell clear_fix ui_rmenu_item_sel add-new-group">
                            <a class="option_name">Добавить группу</a>
                        </div>
                        <div class="line_cell clear_fix ui_rmenu_item_sel update-groups">
                            <a class="option_name">Обновить группы</a>
                        </div>
                        <div class="line_cell clear_fix ui_rmenu_item_sel remove-groups">
                            <a class="option_name">Удалить группы</a>
                        </div>
                        <div class="line_cell clear_fix ui_rmenu_item_sel off-libs">
                            <a class="option_name">Выключить библиотеку</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
    eventDropdown({addElement, updateElement, removeElement, offElement}) {
        this.update(updateElement);
        this.eventAddNewGroup(addElement)
    }
    update(button) {
        button.addEventListener('click', () => {
            let ids = '';
            this.groups.forEach(Group => {
                ids += Group.screen_name + ',';
            })
            this.getGroups(ids);
            this.viewGroups(this.groups);
        })
    }
    save(groups) {
        localStorage.setItem('groups', JSON.stringify(groups));
    }
    eventAddNewGroup(buttonAdd) {
        buttonAdd.addEventListener('click', () => {
            const newGroups = prompt('Введите новую группу');
            this.addNewGroup(newGroups);
        })
    }
    deleteGroup(id) {
        const idx = this.groups.findIndex((Element) => Element.id === id);

        this.groups.splice(idx, 1);
        

        this.save(this.groups);
        this.viewGroups(this.groups);
    }
    async addNewGroup(ids) {
        const response = await req.request(
            {
                method: 'groups.getById',
                config: {
                    'group_ids': ids,
                    'fields': 'links,members_count,status',
                    'v': '5.95'
                }
            }
        );
        const newGroups = response;
        if (newGroups !== undefined) {
            newGroups.response.forEach(Group => {
                let exist = false;
                this.groups.forEach(Groups => {
                    if (Groups.id === Group.id) {
                        exist = true;
                    }
                })
                if (exist === false) {
                    this.groups.push(Group);
                }
            })
            this.save(this.groups);
            this.viewGroups(this.groups);
        }
    }
    async init() {
        await this.getGroups(this.defaultIDS);
        this.viewGroups(this.groups);
        this.dropdownVKTemplate();
    }
}

const VKPinnedGroups = new VkPinnedGroups();
window.VKPinnedGroups = VKPinnedGroups;
})