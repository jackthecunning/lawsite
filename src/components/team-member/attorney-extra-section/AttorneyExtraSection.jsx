
import sectionIcons from './sectionIcons';
import sectionOrder from './sectionOrder.json';
// List of standard fields to skip
const STANDARD_FIELDS = [
	"name",
	"image",
	"title",
	"office",
    "offices",
	"phone",
	"fax",
	"email",
	"bio",
	"practiceAreas",
	"id",
	"slug",
];

function prettifyKey(key) {
	// Convert camelCase or snake_case to Title Case
	return key
		.replace(/([A-Z])/g, " $1")
		.replace(/_/g, " ")
		.replace(/^./, (str) => str.toUpperCase())
		.trim();
}

const AttorneyExtraSection = ({ attorney }) => {
	const extraSections = Object.entries(attorney)
		.filter(([key]) => !STANDARD_FIELDS.includes(key));

	if (extraSections.length === 0) return null;

	// Sort by sectionOrder.json, unknowns go after
	const orderedSections = [
		...sectionOrder
			.map(defKey => extraSections.find(([key]) => key === defKey))
			.filter(Boolean),
		...extraSections.filter(([key]) => !sectionOrder.includes(key))
	];

	return (
		<>
			{orderedSections.map(([key, value]) => {
				const iconClass = sectionIcons[key] || sectionIcons.default;
				return (
					<div className="credential-card" key={key}>
						<div className="section-header">
							<h2>
								<i className={iconClass} aria-hidden="true"></i>
								{prettifyKey(key)}
							</h2>
						</div>
						<div className="section-content">
							<div className="credentials-grid">
								{Array.isArray(value)
									? value.map((item, idx) => (
											<div className="credential-item" key={idx}>
												<i className="fas fa-check-circle" aria-hidden="true"></i>
												<span>{item}</span>
											</div>
										))
									: <div className="credential-item">
											<i className="fas fa-check-circle" aria-hidden="true"></i>
											<span>{value}</span>
										</div>
								}
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default AttorneyExtraSection;
