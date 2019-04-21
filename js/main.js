const req = new Request({
    method: 'groups.getById',
    config: {
        'group_ids': '76746437,howdyho_net,ovsyanochan,countryballs_re,forwebdev,marvel',
        'fields': 'links,members_count,status',
        'v': '5.95'
    }
});


class VkPinnedGroups {
    constructor(props) {
        this.groups = null;
        this.init();
    }
    async getGroups() {
        const groups = await req.request();
        return JSON.parse(groups.response);
    }
    async viewGroups() {
        const groups = await this.getGroups();
        console.log(groups);
        const wrapperGroups = document.querySelector('.groups');
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
                status: Group.status
            }
            this.eventHover(wrap, data);
            wrapperGroups.appendChild(wrap);
        })
    }
    eventHover(group, {members, name, photo, shortName, status}) {
        group.addEventListener('mouseenter', () => {
            const htmlElement = this.viewShortDescription({ members, name, photo, shortName, status });
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
    viewShortDescription({members, name, photo, shortName, status}) {
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
            <button class="quit-group">Выйти из группы</button>
        </div>`
        wrapper.classList.add('modal-wrapper-group');

        return wrapper;
    }
    init() {
        this.viewGroups();
    }
}

const VKPinnedGroups = new VkPinnedGroups();