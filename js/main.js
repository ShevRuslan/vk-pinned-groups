const req = new Request({
    method: 'groups.getById',
    config: {
        'group_ids': '76746437,howdyho_net,ovsyanochan,countryballs_re,forwebdev,marvel',
        'fields': 'links,members_count',
        'v': '5.95'
    }
});