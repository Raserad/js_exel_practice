import './scss/index.scss'

const start = async () => await Promise.resolve('async working!!')

start().then(console.log)