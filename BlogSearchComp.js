function detectSearch() {
    const input = document.querySelector("[data-field='search']");
    const section = document.querySelector("[data-section='hide']");
    const blogHeader = document.querySelector("[data-header='hide']");

    // add check before any implementing other function.
    if(input == null && section == null && blogHeader == null)return;

    input?.addEventListener('input', e => {
        let inputValueLength = e.target?.value?.length;
        if (inputValueLength > 0) {
            section.classList.add('hide');
            blogHeader.classList.add('hide');
        } else {
            section.classList.remove('hide');
            blogHeader.classList.remove('hide');
        }
    })
}
detectSearch();