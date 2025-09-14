import './components/navbar/navbar.component.js';

const app = angular.module('frontpage', []);

app.constant('DATA', {
    profile: {
        name: 'Votre nom',
        title: 'Développeur Full-Stack',
        location: 'Montpellier, France',
        bio: 'Je construis des interfaces web modernes et performantes.'
    },
    links: [
        { label: 'GitHub', url: '' },
        { label: 'LinkedIn', url: '' },
        { label: 'Email', url: '' }
    ],
    skills: [
        { name: 'JavaScript', level: 5 },
        { name: 'AngularJS', level: 4 },
        { name: 'Node.js', level: 5 },
        { name: 'HTML', level: 5 },
        { name: 'CSS', level: 4 },
        { name: 'Java', level: 4 },
        { name: 'Spring', level: 4 },
        { name: 'C++', level: 4 },
        { name: 'Docker', level: 5 },
        { name: 'Git', level: 5 },
        { name: 'Python', level: 5 }
    ],
    projects: [
        { name: 'Projet A', desc: 'Description A', stack: ['Angular', 'Java', 'CSS'], url:'#' },
        { name: 'Projet B', desc: 'Description B', stack: ['Angular', 'Java', 'CSS'], url:'#' },
        { name: 'Projet C', desc: 'Description C', stack: ['Angular', 'Java', 'CSS'], url:'#' }
    ]
});

app.run(($rootScope) => {
    $rootScope.now = new Date();
});

app.component('about-section', {
    templateUrl: 'src/components/about/about.html',
    controllerAs: 'vm',
    controller: class {
        constructor(DATA) {
            Object.assign(this, {
                profile: DATA.profile,
                links: DATA.links,
                skills: DATA.skills
            });
        }
    }
});

app.component('cv-section', {
    templateUrl: 'src/components/cv/cv.html',
    controllerAs: 'vm',
    controller: class {
        constructor(DATA) {
            this.profile = DATA.profile;
            this.skills = DATA.skills;
        }
    }
});

app.component('projects-section', {
    templateUrl: 'src/components/projects/projects.html',
    controllerAs: 'vm',
    controller: class {
        constructor(DATA) {
            this.projects = DATA.projects;
        }
    }
});

app.component('contact-section', {
    templateUrl: 'src/components/contact/contact.html',
    controllerAs: 'vm',
    controller: class {
        form = { name: '', email: '', message: '' };
        sent = false;
        submit = () => { this.sent = true };
    }
});