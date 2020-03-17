import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import Header from '../components/Header';
import Divider from '../components/Divider';
import { fetchMainEvent } from '../api/event';
import { Event } from '../api/@types/Event';

export async function getStaticProps() {
  const mainEvent = await fetchMainEvent();

  return {
    props: {
      mainEvent
    }
  }
}

export default function imprint({mainEvent}: {mainEvent: Event}): ReactElement {
  return <PageFrame title={'Impressum'} mainEvent={mainEvent}>
    <Header title={'Impressum'} topHeader/>

    <div className={'row'}>
      <div className={'col'}>
        <h3>Kontakt:</h3>
        <div>E-Mail: kontakt@shokz.tv</div>
        <div><b>Nachrichten auf den Social-Media-Kanälen sind in der Regel geöffnet</b></div>
        <div>Discord: shokzTV#7986</div>
        <div>Twitter: @shokzTV</div>
        <div>Instagram: @shokzTV</div>
      </div>
      <div className={'col'}>
        <h3>Angaben gemäß § 5 TMG</h3>
        <div>Jan Holtmann</div>
        <div>Kapellenweg 1</div>
        <div>33790 Halle</div>
      </div>
    </div>

    <Divider />

    <div className={'row'}>
      <div className={'col'}>
        <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
        <div>Jan Holtmann</div>
        <div>Kapellenweg 1</div>
        <div>33790 Halle</div>
      </div>
      <div className={'col'}>
          <h3>Social Media</h3>
          <div>Das Impressum gilt auch für folgende Social Media Profile:</div>
          <div><a href={'http://www.twitch.tv/shokzTV'} target={'_blank'} rel={'noreferrer'}>http://www.twitch.tv/shokzTV</a></div>
          <div><a href={'http://www.twitter.com/shokzTV'} target={'_blank'} rel={'noreferrer'}>http://www.twitter.com/shokzTV</a></div>
          <div><a href={'http://www.instagram.com/shokzTV'} target={'_blank'} rel={'noreferrer'}>http://www.instagram.com/shokzTV</a></div>
      </div>
    </div>

    <Divider />

    <h3>Haftung für Inhalte</h3>
    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
    Alle Marken sind Eigentum ihrer jeweiligen Besitzer. Die Informationen auf dieser Seite sind allgemeiner und informativer Art. Für Richtigkeit, Vollständigkeit und Aktualität dieser Inhalte kann keine Haftung übernommen werden

    <h3>Haftung für Links</h3>
    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsve stöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhalt punkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.

    <h3>Urheberrecht</h3>
    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.

    <h3>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h3>
    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.

    <style jsx>{`
      .row {
        margin: -20px;
        display: flex;
      }

      .col {
        width: 50%;
        padding: 20px;
      }

      h3 {
        margin: 15px 0 10px 0;
      }


      @media only screen and (max-width: 768px) { 
        .row {
          margin: 0;
        }
      }

      @media only screen and (max-width: 425px) {
        .row {
          flex-direction: column;
        }
        .col {
          padding: 5px;
          width: 100%;
        }
      }
    `}</style>
  </PageFrame>;
}
