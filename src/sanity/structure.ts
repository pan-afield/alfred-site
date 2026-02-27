import type { StructureResolver } from 'sanity/structure'

//定义了 UI 左侧菜单长什么样（用户界面）
// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Alfred Manager') // 后台左侧菜单的总标题
    .items([
      // 1. 电影模块 (Cinema)
      S.documentTypeListItem('movie')
        .title('Cinema Archives')
        .child(
          S.documentList()
            .title('Movies')
            .filter('_type == "movie"')
        ),

      // 2. 技术日志模块 (Projects/DevLog)
      // 注意：这里必须和你 schemaTypes/project.ts 里的 name: 'project' 一致
      S.documentTypeListItem('project')
        .title('Technical Logs')
        .child(
          S.documentList()
            .title('All Logs')
            .filter('_type == "project"')
        ),

      // 3. 足迹 (新增) 🌍
      S.documentTypeListItem('footprint')
        .title('World Footprints')
        .child(
          S.documentList()
            .title('Destinations')
            .filter('_type == "footprint"')
            // 可以按时间倒序排列，最近去的在最上面
            .defaultOrdering([{ field: 'visitedAt', direction: 'desc' }])
        ),

      // 4. 生活 (新增) 📸
      S.documentTypeListItem('life').title('Daily Moments (Life)'),

      S.divider(),

      // 3. 自动列出其他未手动定义的 Schema (防止漏掉新加的类型)
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['movie', 'project', 'footprint', 'life'].includes(item.getId()!)
      ),
    ])