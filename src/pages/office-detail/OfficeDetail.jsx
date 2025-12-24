import { useParams, Navigate } from 'react-router-dom';
import { offices } from '../../data/firmData';
import OfficeHero from '../../components/offices/office-hero';
import OfficeContactCard from '../../components/office-contact-card';
import OfficeCTA from '../../components/offices/office-cta';
import OfficeSidebar from '../../components/offices/office-sidebar';
import './OfficeDetail.css';

const officeContent = {
  philadelphia: {
    subtitle: 'Serving the Greater Philadelphia Area',
    description: [
      'Our Philadelphia office is strategically located in Center City at 2001 Market Street, providing convenient access to clients throughout the Delaware Valley region. The office is situated in a modern professional building with easy access to public transportation and nearby parking facilities.',
      'The Philadelphia office serves as one of our primary locations, housing a full team of experienced attorneys and support staff dedicated to providing exceptional legal services across our practice areas. Our location allows us to efficiently serve clients in Philadelphia, Montgomery, Delaware, Chester, and Bucks counties.'
    ],
    directionsInfo: 'Located in the heart of Center City Philadelphia, our office is easily accessible via SEPTA Regional Rail, Market-Frankford Line, and multiple bus routes. Parking is available in nearby garages.'
  },
  pittsburgh: {
    subtitle: 'Serving Western Pennsylvania',
    description: [
      'Our Pittsburgh office is located in the historic Koppers Building in downtown Pittsburgh, spanning Floors 7 and 8 at 436 7th Avenue. This iconic landmark provides a distinguished setting for serving our Western Pennsylvania clients, with convenient access to the courthouse district and business community.',
      'The Pittsburgh office maintains a full complement of legal professionals capable of handling complex matters across all our practice areas. Our presence in Pittsburgh allows us to effectively serve clients throughout Allegheny, Westmoreland, Washington, Butler, and surrounding counties in Western Pennsylvania.'
    ],
    directionsInfo: 'Located in downtown Pittsburgh\'s cultural district, the Koppers Building is accessible via multiple bus routes and the T light rail system. Several parking garages are available nearby for client convenience.'
  },
  newyork: {
    subtitle: 'Serving the New York Metropolitan Area',
    description: [
      'Our New York office is located in the heart of Manhattan at 350 Fifth Avenue, Suite 4820. This prestigious Midtown location provides our clients with convenient access to one of the world\'s leading business and legal centers.',
      'The New York office is staffed with experienced attorneys who are well-versed in the complexities of New York law and the unique needs of our metropolitan clients. We serve clients throughout the five boroughs and the greater New York metropolitan area.'
    ],
    directionsInfo: 'Our office is conveniently located near Penn Station and Herald Square, accessible via multiple subway lines including the B, D, F, M, N, Q, R, and W trains. Public parking is available in nearby garages.'
  },
  london: {
    subtitle: 'Serving International Clients',
    description: [
      'Our London office provides a vital connection for clients with international legal needs, particularly those with business interests spanning the Atlantic. Located in the heart of London\'s legal district, we offer sophisticated legal services with a global perspective.',
      'The London office specializes in cross-border transactions and litigation, working seamlessly with our U.S. offices to provide comprehensive legal solutions for our international clients.'
    ],
    directionsInfo: 'Our London office is centrally located and easily accessible via the London Underground. Please contact us for detailed directions and visitor information.'
  },
  mountlaurel: {
    subtitle: 'Serving Southern New Jersey',
    description: [
      'Our Mount Laurel office is strategically positioned to serve clients throughout Southern New Jersey. Located at 1060 N Kings Highway, Suite 200, this office provides convenient access for clients in Burlington, Camden, and surrounding counties.',
      'The Mount Laurel office features a dedicated team of attorneys and staff committed to delivering the same high-quality legal services our firm is known for throughout the region.'
    ],
    directionsInfo: 'Conveniently located just off Route 73 and I-295, our Mount Laurel office is easily accessible with ample parking available on-site.'
  },
  baltimore: {
    subtitle: 'Serving Maryland and the Mid-Atlantic',
    description: [
      'Our Baltimore office is located in the city\'s Inner Harbor district at 100 East Pratt Street, Suite 2600. This prime location allows us to serve clients throughout Maryland and the greater Mid-Atlantic region with efficiency and accessibility.',
      'The Baltimore office houses a skilled team of attorneys experienced in handling complex legal matters across all our practice areas, with particular expertise in regional business and litigation matters.'
    ],
    directionsInfo: 'Located in the heart of downtown Baltimore near the Inner Harbor, our office is accessible via the Light Rail and numerous bus routes. Parking garages are available within walking distance.'
  },
  cleveland: {
    subtitle: 'Serving Northeast Ohio',
    description: [
      'Our Cleveland office is situated in the city\'s central business district at 1301 East Ninth Street, Suite 3500. This location provides excellent access for clients throughout Northeast Ohio and the greater Cleveland metropolitan area.',
      'The Cleveland office is staffed with experienced legal professionals who understand the unique business environment and legal landscape of the region, delivering results-driven solutions for our clients.'
    ],
    directionsInfo: 'Our office is located in downtown Cleveland, easily accessible via the RTA Rapid Transit and bus lines. Multiple parking options are available nearby.'
  }
};

const OfficeDetail = () => {
  const { id } = useParams();
  const office = offices.find(o => o.id === id);
  const content = officeContent[id];

  if (!office || !content) {
    return <Navigate to="/offices" replace />;
  }

  const getDirectionsUrl = () => {
    const addressParts = [
      office.address,
      office.addressLine2,
      office.city
    ].filter(Boolean).join(', ');

    return `https://www.google.com/maps/dir//${encodeURIComponent(addressParts)}`;
  };

  return (
    <>
      <OfficeHero
        officeName={office.fullName}
        subtitle={content.subtitle}
      />

      <section className="content-section section-light">
        <div className="container">
          <div className="office-detail-layout">
            <div className="office-main-info">
              <div className="section-header">
                <h2>Contact Information</h2>
              </div>

              <OfficeContactCard office={office} />

              <div className="section-header" style={{ marginTop: '50px' }}>
                <h2>About Our {office.name} Office</h2>
              </div>

              <div className="office-description">
                {content.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <OfficeCTA office={office} />
            </div>

            <OfficeSidebar
              currentOfficeId={office.id}
              offices={offices}
              directionsUrl={getDirectionsUrl()}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default OfficeDetail;
