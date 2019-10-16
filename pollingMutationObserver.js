;(function poll() {
    // Wait for the progress bar to appear
    if (!document.querySelector('.progress-success')) return setTimeout(poll, 50);
    let progressBar = document.querySelector('.progress-success');

    // Only observe class changes
    const config = { attributes: true, attributeFilter: ['class'] };

    // Callback function to execute when mutations are observed
    const callback = (mutationsList) => {

        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes') {
                console.log('SPA transition');

                let classList = progressBar.classList;
                if (classList.contains('d-none')) {
                    console.log('welcome page - choose parent/teacher/sponsor');
                } else if (classList.contains('w-20pct')) {
                    console.log('sign up / sign in page');
                } else if (classList.contains('w-40pct')) {
                    console.log('sign up input page');
                } else if (classList.contains('w-60pct')) {
                    console.log('search for a school/event page');
                } else if (classList.contains('w-80pct')) {
                    console.log('register student page');
                } else if (classList.contains('hide')) {
                    console.log('add another student page');
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(progressBar, config);
})();
