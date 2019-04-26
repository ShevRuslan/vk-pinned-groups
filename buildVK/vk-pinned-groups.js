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
        this.groups = null;
        this.init();
    }
    async getGroups() {
        const lsGroups = localStorage.getItem('groups');
        if (lsGroups === null) {
            const groups = await req.request({
                method: 'groups.getById',
                config: {
                    'group_ids': '76746437,howdyho_net,ovsyanochan,countryballs_re,forwebdev,marvel',
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

        if (head_nav_btns && top_notify_btn) {
            const openDropdown = document.createElement('div');
            const dropdown = document.createElement('div');    
            dropdown.innerHTML = this.getTemplate();
            openDropdown.appendChild(dropdown);
            openDropdown.classList.add('head_nav_item', 'fl_l', 'settings-groups-control')
            head_nav_btns.insertBefore(openDropdown, top_notify_btn);
        }
    }
    getTemplate() {
        return `
        <span class="option_name">VKPinnedGroups</span>
        <div class="tt_w tt_default tt_up settings-groups">
            <div class="wrapped">
                <div class="notify_sources_tt_content">
                    <div class="content">
                        <div class="line_cell clear_fix ui_rmenu_item_sel cur_default ">
                            <div class="option_name cur_default">Количество групп</div>
                        </div>
                        <div class="line_cell clear_fix ui_rmenu_item_sel ">
                        <a class="option_name">Настройки</a>
                        </div>
                        <div class="line_cell clear_fix ui_rmenu_item_sel ">
                        <a class="option_name">Удалить все группы</a>
                        </div>
                        <div class="line_cell clear_fix ui_rmenu_item_sel ">
                        <a class="option_name">Убрать группы</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
    // eventHover(group, {members, name, photo, shortName, status, id}) {
    //     group.addEventListener('mouseenter', () => {
    //         const htmlElement = this.viewShortDescription({ members, name, photo, shortName, status, id});
    //         const desc = group.querySelector('.modal-wrapper-group');
    //         if(desc === null) {
    //             group.appendChild(htmlElement);
    //         }
    //         else {
    //             desc.style.display = 'flex';
    //         }
    //     })
    //     group.addEventListener('mouseleave', () => {
    //         const desc = group.querySelector('.modal-wrapper-group');
    //         if(desc != null) {
    //             desc.style.display = 'none';
    //         }
    //     })
    // }
    save(groups) {
        localStorage.setItem('groups', JSON.stringify(groups));
    }
    viewShortDescription({members, name, photo, shortName, status, id}) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = 
        `<div class="wrapper-image">
            <img src="${photo}"/>
        </div>
        <div class="description"> 
            <h4>${name}</h4>
            <span class="status">${status}</span>
            <span>Участников: ${members}</span>
            <a href="https://vk.com/${shortName}" target="_blank" >Перейти</a>
            <button class="quit-group">Удалить группу</button>
        </div>`
        wrapper.classList.add('modal-wrapper-group');
        const deleteButton = wrapper.querySelector('.quit-group');
        deleteButton.addEventListener('click', () => {
            this.deleteGroup(id);
        })
        return wrapper;
    }
    eventAddNewGroup() {
        const inputAdd = document.querySelector('.id');
        const buttonAdd = document.querySelector('.add');
        buttonAdd.addEventListener('click', () => {
            this.addNewGroup(inputAdd.value);
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
        const newGroups = JSON.parse(response);
        if (newGroups !== undefined) {
            newGroups.forEach(Group => {
                let exist = false;
                this.groups.response.forEach(Groups => {
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
        await this.getGroups();
        this.viewGroups(this.groups);
        this.eventAddNewGroup();
        this.dropdownVKTemplate();
    }
}

const VKPinnedGroups = new VkPinnedGroups();
window.VKPinnedGroups = VKPinnedGroups;
})