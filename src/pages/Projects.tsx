import { projects } from "../projects"

export function Projects() {
	return (
		<>
			<h1 className="mb-2">Projects</h1>
			<p className="mt-0 mb-12 text-sm opacity-70">Things I have worked on. Everything here is live.</p>

			<ul className="not-prose flex flex-col gap-3">
				{projects.map((project) => (
					<li key={project.url} className="flex items-baseline gap-3">
						<a
							href={project.url}
							className="text-accent text-base no-underline hover:underline"
							rel="noreferrer"
						>
							{project.name}
						</a>
						<span className="text-xs opacity-50">{project.tag}</span>
					</li>
				))}
			</ul>
		</>
	)
}
