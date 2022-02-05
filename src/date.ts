export function formatDate(isoString){
    return new Date(isoString).toLocaleDateString('en-SG', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
};