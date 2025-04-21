"use client"; 

import BlurFade from "../../components/ui/blur-fade-nojs";
import BlurFadeText from "../../components/ui/blur-fade-text";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

const datenschutzData = {
  name: "Yunus Emre Yavuz",
  address: "Gröbenzeller Str. 2, 80997 München, Deutschland",
  email: "yunus@yuemya.de",
  responsiblePerson: "Yunus Emre Yavuz",
};

export default function Datenschutz() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 mb-16">     
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-xl xl:text-4xl/none"
                yOffset={8}
                text="Datenschutzhinweise"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="dsgvo">
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {`

## Verantwortlicher

Yunus Emre Yavuz  
Gröbenzeller Str. 2, 80997 München, Deutschland

E-Mail-Adresse: [yunus@yuemya.de](mailto:yunus@yuemya.de)

Impressum: yuemya.de/impressum

## Übersicht der Verarbeitungen

Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen und verweist auf die betroffenen Personen.

### Arten der verarbeiteten Daten

- Bestandsdaten
- Kontaktdaten
- Inhaltsdaten
- Nutzungsdaten
- Meta-, Kommunikations- und Verfahrensdaten
- Protokolldaten

### Kategorien betroffener Personen

- Kommunikationspartner
- Nutzer

### Zwecke der Verarbeitung

- Kommunikation
- Sicherheitsmaßnahmen
- Organisations- und Verwaltungsverfahren
- Feedback
- Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit
- Informationstechnische Infrastruktur

## Maßgebliche Rechtsgrundlagen

**Maßgebliche Rechtsgrundlagen nach der DSGVO:** Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten. Bitte nehmen Sie zur Kenntnis, dass neben den Regelungen der DSGVO nationale Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder Sitzland gelten können. Sollten ferner im Einzelfall speziellere Rechtsgrundlagen maßgeblich sein, teilen wir Ihnen diese in der Datenschutzerklärung mit.

- **Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO)** - Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Anfrage der betroffenen Person erfolgen.
- **Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)** - die Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten notwendig, vorausgesetzt, dass die Interessen, Grundrechte und Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener Daten verlangen, nicht überwiegen.

**Nationale Datenschutzregelungen in Deutschland:** Zusätzlich zu den Datenschutzregelungen der DSGVO gelten nationale Regelungen zum Datenschutz in Deutschland. Hierzu gehört insbesondere das Gesetz zum Schutz vor Missbrauch personenbezogener Daten bei der Datenverarbeitung (Bundesdatenschutzgesetz – BDSG). Das BDSG enthält insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht auf Löschung, zum Widerspruchsrecht, zur Verarbeitung besonderer Kategorien personenbezogener Daten, zur Verarbeitung für andere Zwecke und zur Übermittlung sowie automatisierten Entscheidungsfindung im Einzelfall einschließlich Profiling. Ferner können Landesdatenschutzgesetze der einzelnen Bundesländer zur Anwendung gelangen.

**Hinweis auf Geltung DSGVO und Schweizer DSG:** Diese Datenschutzhinweise dienen sowohl der Informationserteilung nach dem Schweizer DSG als auch nach der Datenschutzgrundverordnung (DSGVO). Aus diesem Grund bitten wir Sie zu beachten, dass aufgrund der breiteren räumlichen Anwendung und Verständlichkeit die Begriffe der DSGVO verwendet werden. Insbesondere statt der im Schweizer DSG verwendeten Begriffe „Bearbeitung" von „Personendaten", "überwiegendes Interesse" und "besonders schützenswerte Personendaten" werden die in der DSGVO verwendeten Begriffe „Verarbeitung" von „personenbezogenen Daten" sowie "berechtigtes Interesse" und "besondere Kategorien von Daten" verwendet. Die gesetzliche Bedeutung der Begriffe wird jedoch im Rahmen der Geltung des Schweizer DSG weiterhin nach dem Schweizer DSG bestimmt.

## Sicherheitsmaßnahmen

Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher Personen geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.

Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den Daten als auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten, die Löschung von Daten und Reaktionen auf die Gefährdung der Daten gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten bereits bei der Entwicklung bzw. Auswahl von Hardware, Software sowie Verfahren entsprechend dem Prinzip des Datenschutzes, durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.

Kürzung der IP-Adresse: Sofern IP-Adressen von uns oder von den eingesetzten Dienstleistern und Technologien verarbeitet werden und die Verarbeitung einer vollständigen IP-Adresse nicht erforderlich ist, wird die IP-Adresse gekürzt (auch als "IP-Masking" bezeichnet). Hierbei werden die letzten beiden Ziffern, bzw. der letzte Teil der IP-Adresse nach einem Punkt entfernt, bzw. durch Platzhalter ersetzt. Mit der Kürzung der IP-Adresse soll die Identifizierung einer Person anhand ihrer IP-Adresse verhindert oder wesentlich erschwert werden.

Sicherung von Online-Verbindungen durch TLS-/SSL-Verschlüsselungstechnologie (HTTPS): Um die Daten der Nutzer, die über unsere Online-Dienste übertragen werden, vor unerlaubten Zugriffen zu schützen, setzen wir auf die TLS-/SSL-Verschlüsselungstechnologie. Secure Sockets Layer (SSL) und Transport Layer Security (TLS) sind die Eckpfeiler der sicheren Datenübertragung im Internet. Diese Technologien verschlüsseln die Informationen, die zwischen der Website oder App und dem Browser des Nutzers (oder zwischen zwei Servern) übertragen werden, wodurch die Daten vor unbefugtem Zugriff geschützt sind. TLS, als die weiterentwickelte und sicherere Version von SSL, gewährleistet, dass alle Datenübertragungen den höchsten Sicherheitsstandards entsprechen. Wenn eine Website durch ein SSL-/TLS-Zertifikat gesichert ist, wird dies durch die Anzeige von HTTPS in der URL signalisiert. Dies dient als ein Indikator für die Nutzer, dass ihre Daten sicher und verschlüsselt übertragen werden.

## Übermittlung von personenbezogenen Daten

Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass diese an andere Stellen, Unternehmen, rechtlich selbstständige Organisationseinheiten oder Personen übermittelt beziehungsweise ihnen gegenüber offengelegt werden. Zu den Empfängern dieser Daten können z. B. mit IT-Aufgaben beauftragte Dienstleister gehören oder Anbieter von Diensten und Inhalten, die in eine Website eingebunden sind. In solchen Fällen beachten wir die gesetzlichen Vorgaben und schließen insbesondere entsprechende Verträge bzw. Vereinbarungen, die dem Schutz Ihrer Daten dienen, mit den Empfängern Ihrer Daten ab.

## Internationale Datentransfers

Datenverarbeitung in Drittländern: Sofern wir Daten in einem Drittland (d. h., außerhalb der Europäischen Union (EU), des Europäischen Wirtschaftsraums (EWR)) verarbeiten oder die Verarbeitung im Rahmen der Inanspruchnahme von Diensten Dritter oder der Offenlegung bzw. Übermittlung von Daten an andere Personen, Stellen oder Unternehmen stattfindet, erfolgt dies nur im Einklang mit den gesetzlichen Vorgaben. Sofern das Datenschutzniveau in dem Drittland mittels eines Angemessenheitsbeschlusses anerkannt wurde (Art. 45 DSGVO), dient dieser als Grundlage des Datentransfers. Im Übrigen erfolgen Datentransfers nur dann, wenn das Datenschutzniveau anderweitig gesichert ist, insbesondere durch Standardvertragsklauseln (Art. 46 Abs. 2 lit. c) DSGVO), ausdrückliche Einwilligung oder im Fall vertraglicher oder gesetzlich erforderlicher Übermittlung (Art. 49 Abs. 1 DSGVO). Im Übrigen teilen wir Ihnen die Grundlagen der Drittlandübermittlung bei den einzelnen Anbietern aus dem Drittland mit, wobei die Angemessenheitsbeschlüsse als Grundlagen vorrangig gelten. Informationen zu Drittlandtransfers und vorliegenden Angemessenheitsbeschlüssen können dem Informationsangebot der EU-Kommission entnommen werden: [https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de). Im Rahmen des sogenannten „Data Privacy Framework" (DPF) hat die EU-Kommission das Datenschutzniveau ebenfalls für bestimmte Unternehmen aus den USA im Rahmen der Angemessenheitsbeschlusses vom 10.07.2023 als sicher anerkannt. Die Liste der zertifizierten Unternehmen als auch weitere Informationen zu dem DPF können Sie der Website des Handelsministeriums der USA unter [https://www.dataprivacyframework.gov/](https://www.dataprivacyframework.gov/) (in Englisch) entnehmen. Wir informieren Sie im Rahmen der Datenschutzhinweise, welche von uns eingesetzten Diensteanbieter unter dem Data Privacy Framework zertifiziert sind.

## Allgemeine Informationen zur Datenspeicherung und Löschung

Wir löschen personenbezogene Daten, die wir verarbeiten, gemäß den gesetzlichen Bestimmungen, sobald die zugrundeliegenden Einwilligungen widerrufen werden oder keine weiteren rechtlichen Grundlagen für die Verarbeitung bestehen. Dies betrifft Fälle, in denen der ursprüngliche Verarbeitungszweck entfällt oder die Daten nicht mehr benötigt werden. Ausnahmen von dieser Regelung bestehen, wenn gesetzliche Pflichten oder besondere Interessen eine längere Aufbewahrung oder Archivierung der Daten erfordern.

Insbesondere müssen Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden müssen oder deren Speicherung notwendig ist zur Rechtsverfolgung oder zum Schutz der Rechte anderer natürlicher oder juristischer Personen, entsprechend archiviert werden.

Unsere Datenschutzhinweise enthalten zusätzliche Informationen zur Aufbewahrung und Löschung von Daten, die speziell für bestimmte Verarbeitungsprozesse gelten.

Bei mehreren Angaben zur Aufbewahrungsdauer oder Löschungsfristen eines Datums, ist stets die längste Frist maßgeblich.

Beginnt eine Frist nicht ausdrücklich zu einem bestimmten Datum und beträgt sie mindestens ein Jahr, so startet sie automatisch am Ende des Kalenderjahres, in dem das fristauslösende Ereignis eingetreten ist. Im Fall laufender Vertragsverhältnisse, in deren Rahmen Daten gespeichert werden, ist das fristauslösende Ereignis der Zeitpunkt des Wirksamwerdens der Kündigung oder sonstige Beendigung des Rechtsverhältnisses.

Daten, die nicht mehr für den ursprünglich vorgesehenen Zweck, sondern aufgrund gesetzlicher Vorgaben oder anderer Gründe aufbewahrt werden, verarbeiten wir ausschließlich zu den Gründen, die ihre Aufbewahrung rechtfertigen.

**Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:**

- **Aufbewahrung und Löschung von Daten:** Die folgenden allgemeinen Fristen gelten für die Aufbewahrung und Archivierung nach deutschem Recht:
    - 10 Jahre - Aufbewahrungsfrist für Bücher und Aufzeichnungen, Jahresabschlüsse, Inventare, Lageberichte, Eröffnungsbilanz sowie die zu ihrem Verständnis erforderlichen Arbeitsanweisungen und sonstigen Organisationsunterlagen (§ 147 Abs. 1 Nr. 1 i.V.m. Abs. 3 AO, § 14b Abs. 1 UStG, § 257 Abs. 1 Nr. 1 i.V.m. Abs. 4 HGB).
    - 8 Jahre - Buchungsbelege, wie z. B. Rechnungen und Kostenbelege (§ 147 Abs. 1 Nr. 4 und 4a i.V.m. Abs. 3 Satz 1 AO sowie § 257 Abs. 1 Nr. 4 i.V.m. Abs. 4 HGB).
    - 6 Jahre - Übrige Geschäftsunterlagen: empfangene Handels- oder Geschäftsbriefe, Wiedergaben der abgesandten Handels- oder Geschäftsbriefe, sonstige Unterlagen, soweit sie für die Besteuerung von Bedeutung sind, z. B. Stundenlohnzettel, Betriebsabrechnungsbögen, Kalkulationsunterlagen, Preisauszeichnungen, aber auch Lohnabrechnungsunterlagen, soweit sie nicht bereits Buchungsbelege sind und Kassenstreifen (§ 147 Abs. 1 Nr. 2, 3, 5 i.V.m. Abs. 3 AO, § 257 Abs. 1 Nr. 2 u. 3 i.V.m. Abs. 4 HGB).
    - 3 Jahre - Daten, die erforderlich sind, um potenzielle Gewährleistungs- und Schadensersatzansprüche oder ähnliche vertragliche Ansprüche und Rechte zu berücksichtigen sowie damit verbundene Anfragen zu bearbeiten, basierend auf früheren Geschäftserfahrungen und üblichen Branchenpraktiken, werden für die Dauer der regulären gesetzlichen Verjährungsfrist von drei Jahren gespeichert (§§ 195, 199 BGB).

## Rechte der betroffenen Personen

Rechte der betroffenen Personen aus der DSGVO: Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu, die sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:

- **Widerspruchsrecht: Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.**
- **Widerrufsrecht bei Einwilligungen:** Sie haben das Recht, erteilte Einwilligungen jederzeit zu widerrufen.
- **Auskunftsrecht:** Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.
- **Recht auf Berichtigung:** Sie haben entsprechend den gesetzlichen Vorgaben das Recht, die Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.
- **Recht auf Löschung und Einschränkung der Verarbeitung:** Sie haben nach Maßgabe der gesetzlichen Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden, bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine Einschränkung der Verarbeitung der Daten zu verlangen.
- **Recht auf Datenübertragbarkeit:** Sie haben das Recht, Sie betreffende Daten, die Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen anderen Verantwortlichen zu fordern.
- **Beschwerde bei Aufsichtsbehörde:** Sie haben unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die Vorgaben der DSGVO verstößt.

## Bereitstellung des Onlineangebots und Webhosting

Wir verarbeiten die Daten der Nutzer, um ihnen unsere Online-Dienste zur Verfügung stellen zu können. Zu diesem Zweck verarbeiten wir die IP-Adresse des Nutzers, die notwendig ist, um die Inhalte und Funktionen unserer Online-Dienste an den Browser oder das Endgerät der Nutzer zu übermitteln.

- **Verarbeitete Datenarten:** Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme, Interaktionen mit Inhalten und Funktionen); Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern, beteiligte Personen). Protokolldaten (z. B. Logfiles betreffend Logins oder den Abruf von Daten oder Zugriffszeiten.).
- **Betroffene Personen:** Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).
- **Zwecke der Verarbeitung:** Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit; Informationstechnische Infrastruktur (Betrieb und Bereitstellung von Informationssystemen und technischen Geräte (Computer, Server etc.).). Sicherheitsmaßnahmen.
- **Aufbewahrung und Löschung:** Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen zur Datenspeicherung und Löschung".
- **Rechtsgrundlagen:** Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).

**Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:**

- **Erhebung von Zugriffsdaten und Logfiles:** Der Zugriff auf unser Onlineangebot wird in Form von sogenannten "Server-Logfiles" protokolliert. Zu den Serverlogfiles können die Adresse und der Name der abgerufenen Webseiten und Dateien, Datum und Uhrzeit des Abrufs, übertragene Datenmengen, Meldung über erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite) und im Regelfall IP-Adressen und der anfragende Provider gehören. Die Serverlogfiles können zum einen zu Sicherheitszwecken eingesetzt werden, z. B. um eine Überlastung der Server zu vermeiden (insbesondere im Fall von missbräuchlichen Angriffen, sogenannten DDoS-Attacken), und zum anderen, um die Auslastung der Server und ihre Stabilität sicherzustellen; **Rechtsgrundlagen:** Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO). **Löschung von Daten:** Logfile-Informationen werden für die Dauer von maximal 30 Tagen gespeichert und danach gelöscht oder anonymisiert. Daten, deren weitere Aufbewahrung zu Beweiszwecken erforderlich ist, sind bis zur endgültigen Klärung des jeweiligen Vorfalls von der Löschung ausgenommen.
- **Content-Delivery-Network:** Wir setzen ein "Content-Delivery-Network" (CDN) ein. Ein CDN ist ein Dienst, mit dessen Hilfe Inhalte eines Onlineangebotes, insbesondere große Mediendateien, wie Grafiken oder Programm-Skripte, mit Hilfe regional verteilter und über das Internet verbundener Server schneller und sicherer ausgeliefert werden können; **Rechtsgrundlagen:** Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).

## Blogs und Publikationsmedien

Wir nutzen Blogs oder vergleichbare Mittel der Onlinekommunikation und Publikation (nachfolgend "Publikationsmedium"). Die Daten der Leser werden für die Zwecke des Publikationsmediums nur insoweit verarbeitet, als es für dessen Darstellung und die Kommunikation zwischen Autoren und Lesern oder aus Gründen der Sicherheit erforderlich ist. Im Übrigen verweisen wir auf die Informationen zur Verarbeitung der Besucher unseres Publikationsmediums im Rahmen dieser Datenschutzhinweise.

- **Verarbeitete Datenarten:** Bestandsdaten (z. B. der vollständige Name, Wohnadresse, Kontaktinformationen, Kundennummer, etc.); Kontaktdaten (z. B. Post- und E-Mail-Adressen oder Telefonnummern); Inhaltsdaten (z. B. textliche oder bildliche Nachrichten und Beiträge sowie die sie betreffenden Informationen, wie z. B. Angaben zur Autorenschaft oder Zeitpunkt der Erstellung); Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme, Interaktionen mit Inhalten und Funktionen). Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern, beteiligte Personen).
- **Betroffene Personen:** Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).
- **Zwecke der Verarbeitung:** Feedback (z. B. Sammeln von Feedback via Online-Formular). Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.
- **Aufbewahrung und Löschung:** Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen zur Datenspeicherung und Löschung".
- **Rechtsgrundlagen:** Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).

## Kontakt- und Anfrageverwaltung

Bei der Kontaktaufnahme mit uns (z. B. per Post, Kontaktformular, E-Mail, Telefon oder via soziale Medien) sowie im Rahmen bestehender Nutzer- und Geschäftsbeziehungen werden die Angaben der anfragenden Personen verarbeitet, soweit dies zur Beantwortung der Kontaktanfragen und etwaiger angefragter Maßnahmen erforderlich ist.

- **Verarbeitete Datenarten:** Bestandsdaten (z. B. der vollständige Name, Wohnadresse, Kontaktinformationen, Kundennummer, etc.); Kontaktdaten (z. B. Post- und E-Mail-Adressen oder Telefonnummern); Inhaltsdaten (z. B. textliche oder bildliche Nachrichten und Beiträge sowie die sie betreffenden Informationen, wie z. B. Angaben zur Autorenschaft oder Zeitpunkt der Erstellung); Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme, Interaktionen mit Inhalten und Funktionen). Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern, beteiligte Personen).
- **Betroffene Personen:** Kommunikationspartner.
- **Zwecke der Verarbeitung:** Kommunikation; Organisations- und Verwaltungsverfahren; Feedback (z. B. Sammeln von Feedback via Online-Formular). Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.
- **Aufbewahrung und Löschung:** Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen zur Datenspeicherung und Löschung".
- **Rechtsgrundlagen:** Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO). Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO).

**Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:**

- **Kontaktformular:** Bei Kontaktaufnahme über unser Kontaktformular, per E-Mail oder anderen Kommunikationswegen, verarbeiten wir die uns übermittelten personenbezogenen Daten zur Beantwortung und Bearbeitung des jeweiligen Anliegens. Dies umfasst in der Regel Angaben wie Name, Kontaktinformationen und gegebenenfalls weitere Informationen, die uns mitgeteilt werden und zur angemessenen Bearbeitung erforderlich sind. Wir nutzen diese Daten ausschließlich für den angegebenen Zweck der Kontaktaufnahme und Kommunikation; **Rechtsgrundlagen:** Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO), Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).

Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas Schwenke

Stand: 07.01.2025
            `}
          </Markdown>
        </BlurFade>
      </section>
    </main>
  );
}