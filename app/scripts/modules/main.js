import Request from './request';
const req = new Request();

export default class VkPinnedGroups {
    constructor() {
        const lsEnable = JSON.parse(localStorage.getItem('enableVKPinnedGroups'));
        this.defaultIDS = '76746437,howdyho_net,ovsyanochan,forwebdev,marvel';
        this.groups = null;
        this.enable = null;
        if (lsEnable != null) {
            this.enable = lsEnable;
        }
        else {
            this.enable = true;
        }
        this.init();
    }
    async getGroups(ids) {
        const lsGroups = localStorage.getItem('groups');
        if (lsGroups == null) {
            const groups = await req.request({
                method: 'groups.getById',
                config: {
                    'group_ids': ids,
                    'fields': 'links,members_count,status',
                    'v': '5.101'
                }
            });
            this.groups = groups.response
            this.save(this.groups);
        }
        else {
            this.groups = JSON.parse(lsGroups);
        }
    }
    viewGroups(groups) {
        let wrapperGroups = document.querySelector('.wrapper-icons-group');
        if (wrapperGroups === null) {
            wrapperGroups = document.createElement('div');
            wrapperGroups.classList.add('wrapper-icons-group');
            document.querySelector('.side_bar_inner').appendChild(wrapperGroups);
        }
        if (wrapperGroups.children.length >= 1) {
            wrapperGroups.innerHTML = '';
        }
        if (groups !== null) {
            groups.forEach(Group => {
                const wrap = document.createElement('div');
                wrap.classList.add('group');
                wrap.innerHTML = //html
                    `<a href="https://vk.com/${Group.screen_name}" target="_blank">
                        <img src="${Group.photo_50}"/>
                        <p>${Group.name}</p>
                    </a>`;
                wrapperGroups.appendChild(wrap);
            })
        }
    }
    dropdownVKTemplate(count, enable) {
        let headNavButtons = document.querySelector('.head_nav');
        let headNotifyButtons = document.querySelector('.head_nav_btns');

        if (document.querySelector('.settings-groups-control') === null) {
            const openDropdown = document.createElement('div');
            const dropdown = document.createElement('div');    
            dropdown.innerHTML = this.getDropdownTemplate(count, enable);
            openDropdown.appendChild(dropdown);
            openDropdown.classList.add('head_nav_item', 'fl_l', 'settings-groups-control')


            const settingsElements = {
                addElement:    dropdown.querySelector('.add-new-group'),
                updateElement: dropdown.querySelector('.update-groups'),
                removeElement: dropdown.querySelector('.remove-groups'),
                offElement:    dropdown.querySelector('.off-libs'),
            }
            this.eventDropdown(settingsElements);
            headNavButtons.insertBefore(openDropdown, headNotifyButtons);

        }
    }
    getDropdownTemplate(count, enable) {
        const text = enable == true ? 'Выключить библиотеку' : 'Включить библиотеку'
        return`
        <span class="option_name">Группы <div style="margin-top: 5px;" class="top_profile_arrow"></div> </span>
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
                        <div class="line_cell clear_fix ui_rmenu_item_sel remove-groups">
                            <a class="option_name">Удалить группы</a>
                        </div>
                        <div class="line_cell clear_fix ui_rmenu_item_sel off-libs">
                            <a class="option_name">${text}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
    eventDropdown({addElement, removeElement, offElement}) {
        this.eventAddNewGroup(addElement)
        this.deleteAllGroups(removeElement);
        this.offLibs(offElement);
    }
    offLibs(buttonOff) {
        buttonOff.addEventListener('click', () => {
            this.enable = !this.enable;
            if (this.enable) {
                document.querySelector('.settings-groups .off-libs a').textContent = 'Выключить библиотеку' 
                this.init(this.enable);
                document.querySelector('.settings-groups .count').textContent = this.groups.length
            }
            else {
                document.querySelector('.settings-groups .off-libs a').textContent = 'Включить библиотеку'
                const wrapperGroups = document.querySelector('.wrapper-icons-group');
                if (wrapperGroups.children.length >= 1) {
                    wrapperGroups.innerHTML = '';
                }
                document.querySelector('.settings-groups .count').textContent = '0'
            }
            localStorage.setItem('enableVKPinnedGroups', this.enable);
        })
    }
    deleteAllGroups(buttonRemove) {
        buttonRemove.addEventListener('click', () => {
            localStorage.removeItem('groups');
            this.groups = null;
            this.viewGroups(this.groups);
            document.querySelector('.settings-groups .count').textContent = '0'
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
                    'v': '5.101'
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
            document.querySelector('.settings-groups .count').textContent = this.groups.length;
        }
    }
    async init() {
        if (this.enable == true) {
            await this.getGroups(this.defaultIDS);
            this.viewGroups(this.groups);
            this.dropdownVKTemplate(this.groups.length, this.enable);
        }
        else {
            this.dropdownVKTemplate(0, this.enable);
        }
    }
}