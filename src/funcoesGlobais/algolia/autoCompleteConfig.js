import autocomplete from 'autocomplete.js'
import algoliaSearch from 'algoliasearch'
export default (pag) => {
    var client = algoliaSearch('LQELDME44C', 'a07a2e5f5c0661d8c07eceaa56a09c04')
    var index = client.initIndex('usuario')

    autocomplete('#inputPesquisarTopBar', { hint: false }, [
        {
        source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
        displayKey: 'my_attribute',
        templates: {
            suggestion: function(suggestion) {
                return suggestion._highlightResult.nome.value
            }
        }
        }
    ]).on('autocomplete:selected', function(event, suggestion, dataset) {
        console.log(suggestion.objectID)
        pag.$router.push('/usuarios/'+suggestion.objectID)
    })
}