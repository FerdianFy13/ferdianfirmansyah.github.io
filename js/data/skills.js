// img: path to local image in images/skills/, or null for text-only badge
// Categories ordered by current primary focus (Backend first)
export const skillCategories = [
  {
    category: 'Backend',
    skills: [
      { name: 'Laravel',     img: 'images/skills/laravel.png'     },
      { name: 'PHP',         img: null                            },
      { name: 'CodeIgniter', img: 'images/skills/codeigniter.png' },
      { name: 'Node.js',     img: 'images/skills/nodejs.png'      },
      { name: 'REST API',    img: null                            },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'MySQL',    img: 'images/skills/mysql.png'    },
      { name: 'Firebase', img: 'images/skills/firebase.png' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'Alpine.js',   img: null                              },
      { name: 'HTML5',       img: 'images/skills/html.png'         },
      { name: 'CSS3',        img: 'images/skills/css.png'          },
      { name: 'JavaScript',  img: 'images/skills/javascript.png'   },
      { name: 'Bootstrap',   img: 'images/skills/bootstrap.png'    },
      { name: 'jQuery',      img: 'images/skills/jquery.png'       },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git',     img: 'images/skills/git.png'   },
      { name: 'Postman', img: null                       },
      { name: 'Figma',   img: 'images/skills/figma.png' },
      { name: 'VS Code', img: null                       },
    ],
  },
  {
    category: 'Languages',
    skills: [
      { name: 'PHP',        img: null                            },
      { name: 'JavaScript', img: 'images/skills/javascript.png' },
      { name: 'Java',       img: 'images/skills/java.png'       },
    ],
  },
  {
    category: 'Mobile',
    skills: [
      { name: 'Flutter', img: 'images/skills/flutter.png' },
      { name: 'Dart',    img: 'images/skills/dart.png'    },
    ],
  },
];
