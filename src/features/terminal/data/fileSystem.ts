import type { FileSystem } from "../types/file-system";

export const fileSystem: FileSystem = {
	about: {
		type: "directory",
		description:
			"With 19 years of experience spanning a broad range of sectors, I am a CTO and full-stack developer based in Gothenburg, focused on building scalable, high-performance products with speed and precision. My expertise lies in AI-driven innovation and operational efficiency, leveraging cutting-edge technology to optimize processes and drive business growth. I’m passionate about engineering impactful solutions, managing projects from architecture and strategy to implementation and scaling, consistently delivering measurable success across diverse industries.",
		children: {
			"introduction.txt": {
				type: "file",
				content:
					"I started early in the demoscene and have been active since 2005. With extensive experience in both B2B and B2C, I have worked with clients like Scania, AstraZeneca, Collector Bank, and Red Bull. I am a solution-oriented full stack developer passionate about creating added value for end customers and organizations, with additional experience in project management and UX/UI work.",
			},
			"skills.txt": {
				type: "file",
				content:
					"• Frontend: React, Vue, VanillaJS\n• Backend: Node.js, C#, Java, PHP\n• DevOps: Docker, Kubernetes, Serverless\n• Databases: MongoDB, MySQL, RDS\n• Cloud: AWS, Azure, GCP",
			},
			"experience.txt": {
				type: "file",
				content:
					"2021-01 - Present | Quartr | Head of Architecture\n- Technologies: AWS, Nextjs, React, Kubernetes, MongoDB, TDD, Node, TypeScript, RDS\n\n2020-06 - 2021-01 | Dignisia | Full Stack Developer\n- Technologies: Azure, React, C#\n\n2020-06 - Present | AstraZeneca | Full Stack Developer\n- Application: Symptom self-reporting for doctors and researchers\n- Technologies: AWS, React, React Native, Docker, MongoDB, TDD, Node, Nextjs\n\n2020-01 - 2020-05 | Baby Journey | CTO & Full Stack Developer\n- Application: Social pregnancy and baby app\n- Technologies: GCP, Firebase, React Native, React, TypeScript, TDD, Nextjs\n\n2019-06 - 2019-12 | Renable | CTO & Full Stack Developer\n- Application: Platform for retargeting decisions\n- Technologies: AWS, Docker, Serverless, React, Java, Spring Boot, MySQL, MongoDB\n\n2018-08 - 2019-06 | Knodd | CTO & Full Stack Developer\n- Digital healthcare platform for child healthcare\n- Technologies: AWS, Serverless, React Native, React, Node, MongoDB\n\n2017-08 - 2018-08 | Lindex | Full Stack Developer\n- Project: E-commerce platform launch\n- Technologies: Vue, Docker, VanillaJS, Node, SASS, Gulp, HTML5\n\n2017-01 - 2017-05 | Forsman & Bodenfors | Full Stack Developer\n- Projects: IKEA Family screens and Blocket integration\n- Technologies: UWP, Docker, VanillaJS, Node, SASS, Gulp, HTML5\n\n2016-01 - 2017-01 | Collector Bank AB | Full Stack Developer\n- Role: Product owner and developer, with frontend focus\n- Technologies: Angular, React, VanillaJS, Gulp, Grunt, .NET, C#, SASS, HTML5, BDD\n\n2015-08 - 2015-11 | Diasend | Full Stack Developer\n- Technologies: PHP, JavaScript, HTML5, SASS, REST, Node, Docker\n\n2015-04 - 2015-06 | Faktum | Product & Frontend Developer\n- Project: New CRM interface for Faktum\n- Technologies: C#, AngularJS, HTML5, SASS, REST\n\n2015-04 - 2015-03 | AstraZeneca | Full Stack Developer\n- Project: Research tool consolidation prototype\n- Technologies: C#, JavaScript, PHP, HTML5, CSS\n\n2014 - 2014 | Fabege | App Developer\n- Project: Mobile intranet app with push notifications\n- Technologies: C#, Xamarin, LDAP\n\n2014 - 2014 | Kontentan | App Developer\n- Project: Subscription audio app\n- Technologies: Objective C, PHP, Java, Drupal\n\n2014 - 2015 | Optidev | Full Stack Developer\n- Project: External website development\n- Technologies: WordPress, UX, Gulp, SASS, PHP\n\n2014 - 2015 | Wihlborgs Fastigheter | Architect, Full Stack Developer & Product Owner\n- Project: External website with agile UX work\n- Technologies: EPiServer 7, HTML5, SASS, Grunt\n\n2014 - 2014 | Wihlborgs Fastigheter | Project Manager\n- Project: Preliminary study for organizational needs\n\n2013 - 2013 | Mobile Life Centre | Designer & Full Stack Developer\n- Project: Interactive web experience\n- Technologies: PHP, WordPress, jQuery\n\n2012 - 2013 | Fakturum | Product, Architect, Full Stack Developer\n- Project: Financial information sharing app\n- Technologies: PHP, Kohana, MongoDB, JavaScript, jQuery\n\n2012 - 2013 | Red Bull | Full Stack Developer\n- Project: High-traffic competition site\n- Technologies: PHP, Bootstrap, jQuery, Concrete5, MySQL\n\n2011 - 2011 | Vitrolife | Full Stack Developer\n- Project: Digital identity build in EPiServer\n- Technologies: EPiServer 6, HTML5, jQuery\n\n2011 - 2015 | Fabege | Product, Architect, Full Stack Developer\n- Project: Company intranet with social features\n- Technologies: EPiServer 6, EWS API 2013, C#, jQuery, VanillaJS\n\n2011 - 2011 | Scania | Full Stack Developer\n- Project: Truckers’ communication community\n- Technologies: EPiServer 6, Relate 2, HTML5, jQuery\n\n2010 - 2010 | Bjurfors | Backend Developer\n- Project: Local data integration\n- Technologies: C#, EPiServer CMS 6\n\n2010 - 2010 | Stadsbiblioteket | Full Stack Developer\n- Project: Public communication website\n- Technologies: WordPress, PHP, HTML5, VanillaJS\n\n2009 - 2009 | Scania | Backend Developer\n- Project: Campaign platform across 11 languages\n- Technologies: EPiServer 6, EPiServer Relate 1, EPiServer Mail\n\n2009-2009 | Goteborg C/O | Backend Developer\n- Project: Integration with Visit Sweden\n- Technologies: C#, EPiServer CMS 6\n\n2008 - 2008 | Concordia Maritime | Full Stack Developer\n- Project: New website development\n- Technologies: C#, EPiServer 6, HTML, VanillaJS, jQuery\n\n2008 - 2008 | Stena Bulk | Full Stack Developer\n- Project: New website development\n- Technologies: C#, EPiServer 5, HTML, VanillaJS, jQuery\n\n2005 - 2006 | Mio Möbler | Full Stack Developer\n- Project: New website development\n- Technologies: C#, EPiServer 4, HTML, VanillaJS, jQuery",
			},
			"education.txt": {
				type: "file",
				content: "2002 - 2005 | Munkebäck High School | Audiovisual IT",
			},
			"certifications.txt": {
				type: "file",
				content:
					"• 2017 | Fogis | Certified Referee\n• 2007 | EPiServer | EPiServer 6 Certified Developer",
			},
			"languages.txt": {
				type: "file",
				content: "• Swedish: Native\n• English: Fluent",
			},
			"publications.txt": {
				type: "file",
				content:
					"• 2018 | vue-tiny-slider: Open source plugin for Vue 2\n• 2016 | gulp-inject-svg: Open source plugin for Gulp",
			},
		},
	},
	contact: {
		type: "directory",
		description:
			"I'm always excited to connect with fellow developers and potential collaborators.\n\nWhether you have a project in mind, want to discuss technology, or just want to say hello, I'd love to hear from you.\n\nYou can reach out to me through any of the channels listed in the files below.\n\nI typically respond within 24 hours and am open to both remote and local opportunities.",
		children: {
			"email.txt": {
				type: "file",
				content: "Email: viktorsarstrom@gmail.com",
			},
			github: {
				type: "file",
				content: "github.link",
				url: "https://github.com/viktorlarsson",
			},
			linkedin: {
				type: "file",
				content: "linkedin.link",
				url: "https://www.linkedin.com/in/viktoralarsson/",
			},
			x: {
				type: "file",
				content: "linkedin.link",
				url: "https://x.com/viktorsarstrom",
			},
			thisGithubRepository: {
				type: "file",
				content: "this.repository.link",
				url: "https://github.com/viktorlarsson/httpster.tech",
			},
		},
	},
};
