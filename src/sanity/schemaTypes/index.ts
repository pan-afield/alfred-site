import { type SchemaTypeDefinition } from 'sanity'

import { movieType } from './movie'
import { projectType } from './project'
import { footprintType } from './footprint'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [movieType, projectType, footprintType],
}
