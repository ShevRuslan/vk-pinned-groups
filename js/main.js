const req = new Request({
    method: 'groups.getById',
    config: {
        'group_ids': '76746437,howdyho_net,ovsyanochan,countryballs_re,forwebdev,marvel',
        'fields': 'links,members_count',
        'v': '5.95'
    }
});


class VkPinnedGroups {
    constructor(props) {
        this.groups = null;
        this.viewGroups();
    }
    async getGroups() {
        const groups = await req.request();
        return JSON.parse(groups.response);
    }
    async viewGroups() {
        const groups = await this.getGroups();
        const wrapperGroups = document.querySelector('.groups');
        groups.response.forEach(Group => {
            const wrap = document.createElement('div');
            wrap.classList.add('group');
            wrap.innerHTML =
                `<a href="https://vk.com/${Group.screen_name}" target="_blank">
                    <img src="${Group.photo_50}"/>
                    <span>${Group.name}</span>
                </a>`;
            wrapperGroups.appendChild(wrap);
        })
    }
}

const VKPinnedGroups = new VkPinnedGroups();