
export type BuildMode = 'production' | 'development'


export interface BuildEnv {
  mode: BuildMode
  port: number
  apiUrl: string
}