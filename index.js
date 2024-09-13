import 'dotenv/config'
import { readFileSync } from 'node:fs'
import { spawn } from 'node:child_process'

const GITHUB_USERNAME = process.env['GITHUB_USERNAME']
const GITHUB_TOKEN = process.env['GITHUB_TOKEN']
const JSON_FILE_PATH= process.argv[2]
const WORKING_DIRECTORY = process.argv[3] ?? '.'

try {
  if (!GITHUB_USERNAME) throw new Error('Environment variable GITHUB_USERNAME not set')
  if (!GITHUB_TOKEN) throw new Error('Environment variable GITHUB_TOKEN not set')
  if (!JSON_FILE_PATH) throw new Error('You must specify a JSON repository file')

  let jsonFile = readFileSync(JSON_FILE_PATH, 'utf8')
  let { repositories, defaults } = JSON.parse(jsonFile)

  for (let [key, value] of Object.entries(repositories)) {
    let { url, branch, depth } = { ...defaults, ...value }

    let cloneArguments = ['clone']
    if(branch) cloneArguments.push('--branch', branch)
    if(depth) cloneArguments.push('--depth', depth)
    cloneArguments.push(`https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${url}.git`)

    console.log('clone', cloneArguments)

    let clone = spawn( 'git', cloneArguments, { cwd: WORKING_DIRECTORY })
    clone.stdout.on('data', data=> console.log(key, data.toString()))
    clone.stderr.on('data', data=> console.log(key, data.toString()))
    clone.on('close', code=> {
      if(code==0) console.log('✓ cloning', url, 'succeded')
      else console.error('✗ cloning', url, 'failed')
    })
  }
}
catch(error) {
  console.error('Error:', error.message)
  process.exitCode = 1
}
