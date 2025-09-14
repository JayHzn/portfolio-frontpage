class NavbarCtrl {
    static $inject = ['$window', '$timeout'];
    constructor($window, $timeout) {
        this.$window = $window;
        this.$timeout = $timeout;

        this.sections = [
            { label: 'A propos', id: 'about' },
            { label: 'Projets', id:'projects' },
            { label: 'CV', id: 'cv' },
            { label: 'Contact', id: 'contact' }
        ];

        this.activeId = this.sections[0].id;
        this._observer = null;
        this._onScroll = null;
    }

    $onInit() {
        const ids = this.sections.map(s => s.id );

        const rootMargin = '-45% 0px -50% 0px';
        if ('IntersectionObserver' in this.$window) {
            this._observer = new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) this.activeId = e.target.id;
                });
            }, { root: null, rootMargin, threshold: 0 });

            ids.forEach((id) => {
                const el = document.getElementById(id);
                if (el) this._observer.observe(el);
            });
        } else {
            this._onScroll = () => {
                const y = this.$window.scrollY + 100;
                let current = ids[0];
                for (let i = 0; i < ids.length; i++) {
                    const el = document.getElementById(ids[i]);
                    if (el && el.offsetTop <= y) current = ids[i];
                }
                this.activeId = current;
            };

            this.$window.addEventListener('scroll', this._onScroll, { passive: true });
            this._onScroll();
        }
    };

    $onDestroy() {
        if (this._observer) this._observer.disconnect();
        if (this._onScroll) this.$window.removeEventListener('scroll', this._onScroll);
    }

    scrollTo = (id) => {
        const el = document.getElementById(id);
        if (!el) return;

        el.scrollIntoView({ behavior: 'smooth', block: 'start' });

        this.$timeout(() => {
            const top = el.getBoundingClientRect().top + this.$window.scrollY - 72;
            this.$window.scrollTo({ top });
        }, 350);
    };
}

angular.module('frontpage').component('navbar', {
    templateUrl: 'src/components/navbar/navbar.html',
    controllerAs: 'vm',
    controller: NavbarCtrl        
});