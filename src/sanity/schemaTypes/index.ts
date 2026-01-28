import { type SchemaTypeDefinition } from 'sanity'

import { movieType } from './movie'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [movieType],
}
