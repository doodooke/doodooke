export default (async function ({ redirect, store }) {
    if (store.state.browser == "IE") {
        redirect('/browser/update')
    }
});
