export default () => {
const search = instantsearch({
  appId: 'LQELDME44C',
  apiKey: 'a07a2e5f5c0661d8c07eceaa56a09c04',
  indexName: 'usuario',
  urlSync: false
});

search.start();
}