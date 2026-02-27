import { type SchemaTypeDefinition } from 'sanity'

import { movieType } from './movie'
import { projectType } from './project'
import { footprintType } from './footprint'
import { lifeType } from './life'
import { gameType } from './games'
import { musicType } from './music'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [movieType, projectType, footprintType, lifeType, gameType, musicType],
}
