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
            this.groups = JSON.parse(groups.response);
            this.save(this.groups);
        }
        else {
            this.groups = JSON.parse(lsGroups);
        }
    }
    viewGroups(groups) {
        const wrapperGroups = document.querySelector('.groups');
        if (wrapperGroups.children.length >= 1) {
            wrapperGroups.innerHTML = '';
        }
        groups.response.forEach(Group => {
            const wrap = document.createElement('div');
            wrap.classList.add('group');
            wrap.innerHTML =
                `<a href="https://vk.com/${Group.screen_name}" target="_blank">
                    <img src="${Group.photo_50}"/>
                    <span>${Group.name}</span>
                </a>`;
            const data = {
                members: Group.members_count,
                name: Group.name,
                photo: Group.photo_100,
                shortName: Group.screen_name,
                status: Group.status,
                id: Group.id
            }
            this.eventHover(wrap, data);
            wrapperGroups.appendChild(wrap);
        })
    }
    eventHover(group, {members, name, photo, shortName, status, id}) {
        group.addEventListener('mouseenter', () => {
            const htmlElement = this.viewShortDescription({ members, name, photo, shortName, status, id});
            const desc = group.querySelector('.modal-wrapper-group');
            if(desc === null) {
                group.appendChild(htmlElement);
            }
            else {
                desc.style.display = 'flex';
            }
        })
        group.addEventListener('mouseleave', () => {
            const desc = group.querySelector('.modal-wrapper-group');
            if(desc != null) {
                desc.style.display = 'none';
            }
        })
    }
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
        console.log(this.groups.response);
        const idx = this.groups.response.findIndex((Element) => Element.id === id);

        const newArray = [
            ...this.groups.response.slice(0, idx),
            ...this.groups.response.slice(idx + 1)
        ];
        this.groups.response = newArray;
        
        console.log(this.groups.response);
        
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
        const newGroups = JSON.parse(response.response);
        newGroups.response.forEach(Group => {
            let exist = false;
            this.groups.response.forEach(Groups => {
                if (Groups.id === Group.id) {
                    exist = true;
                }
            })
            if (exist === false) {
                this.groups.response.push(Group);
            }
        })
        this.save(this.groups);
        this.viewGroups(this.groups);
    }
    async init() {
        await this.getGroups();
        this.viewGroups(this.groups);
        this.eventAddNewGroup();
    }
}

const VKPinnedGroups = new VkPinnedGroups();