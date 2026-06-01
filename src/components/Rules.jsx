import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import '../App.css';
import Footer from './footer';
import { DOS_LIST, DONTS_LIST } from '../data';
import './css/rules.css';

export default function RulesPage() {
  return (
    <>
      <div className="rules-page">

        {/* Header */}

          <header className="rules-header">
            <h1>Rules & Regulations</h1>
            <p>
              Responsible tourism guidelines for Nepal&apos;s conservation areas.
              Please follow these rules to protect our natural and cultural heritage.
            </p>
          </header>


        {/* Warning */}
        <section className="rules-warning">
          <AlertTriangle className="icon warning-icon" />
          <p>
            Violation of conservation rules may result in permit cancellation,
            financial penalties, or legal action.
          </p>
        </section>

        {/* Do & Don't */}
        <section className="rules-cards">
          <div className="rules-card dos">
            <h2>
              <CheckCircle2 className="icon" />
              Do's - Please Follow
            </h2>
            <ul>
              {DOS_LIST.map((item, index) => (
                <li key={index}>
                  <CheckCircle2 className="icon" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rules-card donts">
            <h2>
              <AlertTriangle className="icon" />
              Don'ts - Strictly Prohibited
            </h2>
            <ul>
              {DONTS_LIST.map((item, index) => (
                <li key={index}>
                  <AlertTriangle className="icon" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Info */}
            {/* Minimum Impact Code */}
            <section className="rules-info">
              <h2>Minimum Impact Code</h2>

              <div className="info-card">
                <h3>Awareness & Responsibility</h3>
                <p>
                  Awareness and responsibility are the first things you should take on your
                  trek or visit. Encourage others to follow responsible tourism practices
                  and always use trained guides.
                </p>
              </div>

              <div className="info-card">
                <h3>Conserve the Forests</h3>
                <p>
                  Reduce the use of firewood, order the same meal for group members, choose
                  lodges that use solar energy, avoid campfires, wear warm clothing, and use
                  alternative fuels for cooking.
                </p>
              </div>

              <div className="info-card">
                <h3>Stop Pollution</h3>
                <p>
                  Carry out what you carry in, minimize plastic use, refill water bottles at
                  safe stations, use waste bins when available, take batteries back home,
                  and dispose of human waste at least 50 meters away from water sources.
                </p>
              </div>

              <div className="info-card">
                <h3>Protect Wildlife & Plants</h3>
                <p>
                  Do not disturb or injure animals, do not pick flowers or collect plants,
                  and never buy items made from wildlife parts.
                </p>
              </div>

              <div className="info-card">
                <h3>Protect Habitats & Prevent Erosion</h3>
                <p>
                  Stay on marked trails, avoid shortcuts, do not climb trees, and do not
                  break branches. Walk carefully to prevent soil erosion.
                </p>
              </div>

              <div className="info-card">
                <h3>Cultural Respect & Behavior</h3>
                <p>
                  Respect local traditions, remove shoes before entering temples, dress
                  modestly, avoid public displays of affection, walk clockwise around
                  Buddhist stupas, and never enter private property without permission.
                </p>
              </div>

              <div className="info-card">
                <h3>Photography Etiquette</h3>
                <p>
                  Always ask permission before taking photographs of people and respect
                  their decision if they refuse.
                </p>
              </div>
            </section>

      </div>

      <Footer />
    </>
  );
}
