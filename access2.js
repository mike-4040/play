
async function promiseAccessProjectTemplate(userid, project_id, options = {}) {
    const params = [];
    const query = `
        SELECT
            projects.id,
            projects.owner,
            projects.permissions,
            projects.deleted,
            projects.template,
            projects.team,
            projects.public_sharing,
            team_members.role,
            project_template_members.userid::BOOL as member_exists
        FROM
            task_mgmt.projects
        LEFT JOIN 
            task_mgmt.team_members
        ON
            team_members.team_id = projects.team
            AND team_members.userid = $${params.push(userid)}
        LEFT JOIN 
            task_mgmt.project_template_members
        ON
            project_template_members.project_id = $${params.push(project_id)}
            AND project_template_members.userid = $${params.push(userid)}
        WHERE
            projects.id = $${params.push(project_id)}
            AND projects.template = TRUE
            AND projects.team IS NOT NULL
    `;

    /**
             *     const id_to_check =
        typeof project_id === 'string' && project_id.startsWith('t-')
            ? 'projects.permanent_template_id'
            : 'projects.id';
    const params = [userid, project_id];
    const query = `
        SELECT
            projects.id,
            projects.owner,
            projects.permissions,
            projects.deleted,
            projects.template,
            projects.team,
            projects.public_sharing,
            team_members.role,
            project_template_members.userid::BOOL as member_exists
        FROM
            task_mgmt.projects
            LEFT JOIN 
                task_mgmt.team_members
            ON
                team_members.team_id = projects.team
                AND team_members.userid = $1
        LEFT JOIN 
            task_mgmt.project_template_members
            ON
                project_template_members.project_id = projects.id
                AND project_template_members.userid = $1
        WHERE
            ${id_to_check} = $2
            AND projects.template = TRUE
            AND projects.team IS NOT NULL`;
             */
    let data;
    try {
        data = await db.promiseReadQuery(query, params);
    } catch (err) {
        throw new AccessError(err, 'ACCESS_160', 500);
    }
    if (!data.rows.length) {
        throw new AccessError('Could not find template', 'ACCESS_161', 404);
    }
    const [template] = data.rows;
    if (template.deleted) {
        throw new AccessError('Template has been deleted', 'ACCESS_162', 404);
    }
    if (options.skip_permissions || template.public_sharing) {
        return template;
    }
    switch (template.permissions) {
        case config.template_permissions.members:
            if (!template.member_exists) {
                throw new AccessError('You do not have permission to view this template', 'ACCESS_163', 403);
            }
            break;
        case config.template_permissions.admin:
            if (![config.team_roles.owner, config.team_roles.admin].includes(template.role)) {
                throw new AccessError('You do not have permission to view this template', 'ACCESS_164', 403);
            }
            break;
        case config.template_permissions.private:
            if (template.owner !== userid) {
                throw new AccessError('You do not have permission to view this template', 'ACCESS_165', 403);
            }
            break;
        case config.template_permissions.team_members:
            if ([config.team_roles.guest].includes(template.role)) {
                throw new AccessError('You do not have permission to view this template', 'ACCESS_186', 403);
            }
            break;
        default:
            if (!template.role) {
                throw new AccessError('You do not have permission to view this template', 'ACCESS_166', 403);
            }
    }
    return template;
}