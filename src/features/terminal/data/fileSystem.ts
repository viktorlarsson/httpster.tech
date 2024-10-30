import type { FileSystem } from "../types/file-system";

export const fileSystem: FileSystem = {
	about: {
		type: "directory",
		description:
			"Hello! I'm a passionate software developer with a love for creating innovative solutions.\n\nWith over 19 years of experience in full-stack development, I've had the privilege of working on diverse projects that have shaped my expertise.",
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
					"2021-01 - Present | Quartr | Head of Architecture\n- Technologies: AWS, Nextjs, React, Kubernetes, MongoDB, Node, TypeScript\n\n2020-06 - 2021-01 | Dignisia | Full Stack Developer\n- Technologies: Azure, React, C#\n\n2020-06 - Present | AstraZeneca | Full Stack Developer\n- Application for symptom self-reporting for doctors and researchers\n- Technologies: AWS, React, Docker, MongoDB, Node\n\n2018-08 - 2019-06 | Knodd | CTO & Full Stack Developer\n- Digital healthcare platform for child healthcare\n- Technologies: AWS, React Native, React, Node, MongoDB",
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
		},
	},
};
