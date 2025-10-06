import React from "react";
import { useMemo, useState } from "react";
import { WHATSAPP_CHANNEL_URL, SHOP_URL, PAYPAL_URL, FORMSPREE_ENDPOINT, EVENT, PARTNER, Partner } from "./content";

type TabKey = "start"|"news"|"events"|"partner"|"shop"|"teilnehmer"|"helfer"|"spenden"|"impressum"|"kontakt";
const TABS: [TabKey,string][]= [["start","Start"],["news","News"],["events","Events"],["partner","Partner"],["shop","Shop"],["teilnehmer","Teilnehmer"],["helfer","Helfer"],["spenden","Spenden"],["impressum","Impressum"],["kontakt","Kontakt"]];

function Logo() { return <img src="/assets/Logo_schwarz_weiss.png" alt="FFF" className="h-10 w-10 object-contain" />; }
function LogoLarge() { return <img src="/assets/Logo_schwarz_weiss.png" alt="FFF groß" className="h-28 md:h-40 object-contain" />; }

export default function App(){
  const [tab,setTab]=useState<TabKey>("start");
  const startDate=useMemo(()=>new Date(EVENT.startAt),[]);
  const [now,setNow]=useState(new Date());
  React.useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return ()=>clearInterval(t);},[]);
  const s=Math.max(0, Math.floor((startDate.getTime()-now.getTime())/1000));
  const days=Math.floor(s/86400), hours=Math.floor((s%86400)/3600), minutes=Math.floor((s%3600)/60), seconds=s%60;

  return <div className="min-h-screen flex flex-col">
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3"><Logo/><div className="leading-tight"><div className="font-bold">Fahrer · Freunde · Familie</div><div className="text-xs text-neutral-600">Community · Events · Charity</div></div></div>
        <nav className="hidden md:flex items-center gap-2">
          {TABS.map(([k,l])=> <button key={k} onClick={()=>setTab(k)} className={"px-3 py-2 rounded-xl text-sm "+(tab===k?"bg-black text-white":"text-neutral-700 hover:bg-neutral-200")}>{l}</button>)}
          <a href={WHATSAPP_CHANNEL_URL} target="_blank" rel="noreferrer" className="ml-2 px-3 py-2 rounded-xl text-sm border border-neutral-300 hover:bg-neutral-100">WhatsApp-Kanal</a>
        </nav>
      </div>
    </header>

    <main className="mx-auto max-w-6xl w-full px-4 py-6 flex-1">
      <MobileTabs tab={tab} setTab={setTab}/>
      {tab==="start" && <section className="space-y-6">
        <div className="flex justify-center"><LogoLarge/></div>
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
          <div className="p-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">{EVENT.title}</h2>
              <div className="mt-2 text-neutral-700">{EVENT.dateLine}</div>
              <p className="mt-4 text-neutral-700">Gemeinsam für Kinder: LKW-Show, Familienprogramm, Tombola & mehr. Unterstütze <em>Strahlemännchen</em> und zeig, wofür unsere Community steht!</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#/teilnehmer" onClick={()=>setTab("teilnehmer")} className="px-4 py-2 rounded-xl bg-black text-white text-sm font-semibold">Jetzt mitmachen</a>
                <a href="#/events" onClick={()=>setTab("events")} className="px-4 py-2 rounded-xl border border-neutral-300 text-sm hover:bg-neutral-100">Infos für Fahrer*innen</a>
                <a href={WHATSAPP_CHANNEL_URL} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl border border-neutral-300 text-sm hover:bg-neutral-100">WhatsApp-Kanal</a>
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h3 className="text-sm font-semibold text-neutral-700 tracking-wide">Countdown bis Start (Sa, 10:00 Uhr)</h3>
              <div className="mt-3 grid grid-cols-4 gap-3">
                <TimeBox label="Tage" value={days}/>
                <TimeBox label="Stunden" value={hours}/>
                <TimeBox label="Minuten" value={minutes}/>
                <TimeBox label="Sekunden" value={seconds}/>
              </div>
              <p className="mt-4 text-xs text-neutral-500">* Zeiten aktualisieren sich automatisch</p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <FeatureCard title="Community" text="Austausch, Hilfe und Zusammenhalt – online & vor Ort."/>
          <FeatureCard title="Events" text="Treffen, Touren & das Benefiz-Festival in Marburg."/>
          <FeatureCard title="Charity" text="Wir sammeln für Kinder – transparent & mit Herz."/>
        </div>
      </section>}

      {tab==="partner" && <PartnerSection items={PARTNER}/>}
      {tab==="shop" && <ShopSection/>}
      {tab==="teilnehmer" && <TeilnehmerForm/>}
      {tab==="helfer" && <HelferForm/>}
      {tab==="spenden" && <SpendenSection/>}
      {tab==="impressum" && <ImpressumSection/>}
      {tab==="kontakt" && <KontaktSection/>}
      {tab==="news" && <Placeholder title="News"/>}
      {tab==="events" && <Placeholder title="Events"/>}
    </main>

    <footer className="border-t border-neutral-200">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Logo/><p>© {new Date().getFullYear()} Fahrer · Freunde · Familie – Alle Rechte vorbehalten.</p></div>
        <div className="flex gap-3">
          <a className="hover:text-black" href="#/impressum" onClick={()=>setTab("impressum")}>Impressum</a>
          <a className="hover:text-black" href="#/kontakt" onClick={()=>setTab("kontakt")}>Kontakt</a>
          <a className="hover:text-black" href={WHATSAPP_CHANNEL_URL} target="_blank" rel="noreferrer">WhatsApp-Kanal</a>
        </div>
      </div>
    </footer>
  </div>;
}

function MobileTabs({tab,setTab}:{tab:TabKey;setTab:(k:TabKey)=>void}){
  return <div className="md:hidden mb-4">
    <div className="grid grid-cols-3 gap-2">
      {TABS.map(([k,l])=> <button key={k} className={"px-2 py-2 rounded-lg text-xs "+(tab===k?"bg-black text-white":"bg-neutral-100 text-neutral-800")} onClick={()=>setTab(k)}>{l}</button>)}
    </div>
  </div>;
}

function TimeBox({label,value}:{label:string;value:number}){
  const v=String(value).padStart(2,"0");
  return <div className="text-center rounded-xl border border-neutral-200 bg-white p-4"><div className="text-3xl font-extrabold tabular-nums">{v}</div><div className="text-xs text-neutral-600 mt-1">{label}</div></div>;
}
function FeatureCard({title,text}:{title:string;text:string}){ return <div className="rounded-2xl border border-neutral-200 bg-white p-5"><div className="text-base font-semibold">{title}</div><p className="mt-1 text-neutral-700">{text}</p></div>; }
function Placeholder({title}:{title:string}){ return <section className="space-y-2"><h2 className="text-xl font-bold">{title}</h2><p className="text-neutral-700">Inhalte folgen.</p></section> }

function PartnerSection({items}:{items:Partner[]}){
  return <section className="space-y-4">
    <div className="flex items=end justify-between">
      <h2 className="text-xl font-bold">Partner & Unterstützer ({items.length})</h2>
      <button className="text-sm px-3 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100">Partner werden</button>
    </div>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((p,i)=> <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="h-16 mb-3 rounded-lg bg-neutral-100 flex items-center justify-center">{p.logo && <img src={p.logo} alt={p.name} className="max-h-12 max-w-[140px] object-contain" />}</div>
        <div className="text-base font-semibold">{p.name}</div>
        {p.url ? <a className="text-sm text-sky-700 hover:underline break-all" href={p.url} target="_blank" rel="noreferrer">{p.url}</a> : <div className="text-sm text-neutral-500">(Website folgt)</div>}
        {p.description && <p className="text-sm text-neutral-600 mt-2">{p.description}</p>}
      </div>)}
    </div>
  </section>;
}

function ShopSection(){
  return <section className="space-y-4">
    <h2 className="text-xl font-bold">Shop</h2>
    <div className="rounded-2xl border border-neutral-200 p-6 bg-white">
      <p className="text-neutral-700">Hier geht es zu unserem Merchandise- und Sticker-Shop.</p>
      <a href={SHOP_URL} target="_blank" rel="noreferrer" className="inline-block mt-4 px-4 py-2 rounded-xl bg-black text-white text-sm font-semibold">Zum Shop</a>
      <p className="text-xs text-neutral-500 mt-3">* Externer Link. Öffnet in neuem Tab.</p>
    </div>
  </section>;
}

function TeilnehmerForm(){
  return <section className="space-y-4">
    <h2 className="text-xl font-bold">Teilnehmer – Anmeldung für LKW-Fahrer</h2>
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <form action={FORMSPREE_ENDPOINT} method="POST" className="grid md:grid-cols-2 gap-4">
        <Field label="Vorname"><input name="vorname" required className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300" /></Field>
        <Field label="Nachname"><input name="nachname" required className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300" /></Field>
        <Field label="Telefon"><input name="telefon" required className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300" /></Field>
        <Field label="E-Mail (für Bestätigung)"><input type="email" name="email" required className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300" /></Field>
        <Field label="Kennzeichen"><input name="kennzeichen" required className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300" /></Field>
        <Field label="Marke/Modell (optional)"><input name="markeModell" className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300" /></Field>
        <Field label="Beifahrer/innen, die mitfrühstücken"><input type="number" min={0} step={1} name="personenFruehstueck" className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300" /></Field>
        <Field label="Anreise">
          <select name="anreise" className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300">
            <option>Samstag (08.11.)</option><option>Freitag (Vorabend)</option><option>Andere</option>
          </select>
        </Field>
        <Field label="Kommentar (optional)" wide><textarea name="kommentar" rows={4} className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300" /></Field>
        <div className="md:col-span-2 flex items-center gap-2">
          <input id="dsgvo-tn" name="datenschutz" type="checkbox" required />
          <label htmlFor="dsgvo-tn" className="text-sm">Ich stimme der Verarbeitung meiner Daten gemäß Datenschutz zu.</label>
        </div>
        <input type="hidden" name="_subject" value="Teilnehmer-Anmeldung (FFF-App)" />
        <input type="hidden" name="_replyto" value="" />
        <div className="md:col-span-2 flex items-center justify-between">
          <a href={PAYPAL_URL} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl border border-neutral-300 text-sm hover:bg-neutral-100">Jetzt via PayPal zahlen</a>
          <button type="submit" className="px-4 py-2 rounded-xl bg-black text-white text-sm font-semibold">Anmeldung senden</button>
        </div>
      </form>
    </div>
  </section>;
}

function HelferForm(){
  return <section className="space-y-4">
    <h2 className="text-xl font-bold">Helfer*innen gesucht</h2>
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <form action={FORMSPREE_ENDPOINT} method="POST" className="grid md:grid-cols-2 gap-4">
        <input type="hidden" name="_subject" value="Helfer-Anmeldung (FFF-App)" />
        <Field label="Vorname"><input name="vorname" required className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300" /></Field>
        <Field label="Nachname"><input name="nachname" required className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300" /></Field>
        <Field label="Telefon"><input name="telefon" required className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300" /></Field>
        <Field label="E-Mail"><input type="email" name="email" className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300" /></Field>
        <Field label="Rolle">
          <select name="rolle" required className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300">
            <option value="">Bitte auswählen…</option><option>Aufbau (Fr/Sa)</option><option>Abbau (So)</option><option>Kasse/Einlass</option><option>Tombola</option><option>Kinderprogramm</option><option>Platzteam/Einweiser</option><option>Backstage/Bühne</option>
          </select>
        </Field>
        <Field label="Verfügbarkeit">
          <select name="zeitraum" className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300">
            <option>Vorbereitung (Fr, 07.11.)</option><option>Samstag (08.11.)</option><option>Sonntag (09.11.)</option><option>Flexibel / nach Bedarf</option>
          </select>
        </Field>
        <Field label="Kommentar (optional)" wide><textarea name="kommentar" rows={4} className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300" /></Field>
        <div className="md:col-span-2 flex items-center gap-2">
          <input id="dsgvo-h" name="datenschutz" type="checkbox" required />
          <label htmlFor="dsgvo-h" className="text-sm">Ich stimme der Verarbeitung meiner Daten gemäß Datenschutz zu.</label>
        </div>
        <div className="md:col-span-2"><button className="px-4 py-2 rounded-xl bg-black text-white text-sm font-semibold" type="submit">Anmeldung senden</button></div>
      </form>
    </div>
  </section>;
}

function SpendenSection(){
  const quick=[5,10,20,50];
  return <section className="space-y-4">
    <h2 className="text-xl font-bold">Spenden</h2>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <h3 className="font-semibold">Unterstütze Strahlemännchen</h3>
        <p className="text-neutral-700 mt-2">Es gibt zwei Wege zu spenden: PayPal oder Barspende vor Ort.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {quick.map(amt=> <a key={amt} href={PAYPAL_URL} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg text-sm border border-neutral-300 hover:bg-neutral-100">{amt} € via PayPal</a>)}
          <a href={PAYPAL_URL} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg text-sm bg-black text-white font-semibold">Freien Betrag spenden</a>
        </div>
        <p className="text-xs text-neutral-500 mt-3">Barspenden sind am Infostand möglich.</p>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <ul className="list-disc list-inside text-neutral-700 mt-2">
          <li>Alle Spenden kommen der Kinderhilfsorganisation <em>Strahlemännchen</em> zugute.</li>
          <li>Ab einem Spendenbetrag von 50 € stellt Strahlemännchen direkt vor Ort eine Spendenquittung aus.</li>
          <li>Bestätigung auf Wunsch vor Ort.</li>
        </ul>
      </div>
    </div>
  </section>;
}

function ImpressumSection(){return <section className="space-y-4"><h2 className="text-xl font-bold">Impressum</h2><div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-3 text-neutral-700"><p><strong>Angaben gemäß § 5 TMG</strong></p><p>Ralf May<br/>Eisenbahnstraße 47<br/>79418 Schliengen (Deutschland)</p><p>Mobil: <a className="underline" href="tel:+491719603554">+49 171 9603554</a><br/>E-Mail: <a className="underline" href="mailto:Trucks4kids2025@gmail.com">Trucks4kids2025@gmail.com</a></p><p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Ralf May, Anschrift wie oben.</p><p className="text-sm text-neutral-500">Letzte Aktualisierung: {new Date().toLocaleDateString("de-DE")}</p></div></section>;}

function KontaktSection(){return <section className="space-y-4"><h2 className="text-xl font-bold">Kontakt</h2><div className="grid md:grid-cols-2 gap-4"><div className="rounded-2xl border border-neutral-200 bg-white p-5"><h3 className="font-semibold">Orga / Ansprechperson</h3><p className="text-neutral-700 mt-2">Ralf May</p><p className="text-neutral-700">Eisenbahnstraße 47, 79418 Schliengen</p><p className="text-neutral-700">Mobil: <a className="underline" href="tel:+491719603554">+49 171 9603554</a></p><p className="text-neutral-700">E-Mail: <a className="underline" href="mailto:Trucks4kids2025@gmail.com">Trucks4kids2025@gmail.com</a></p></div><div className="rounded-2xl border border-neutral-200 bg-white p-5"><h3 className="font-semibold">Mitmachen</h3><ul className="list-disc list-inside text-neutral-700 mt-2"><li>Als Fahrer*in anmelden</li><li>Als Sponsor*in unterstützen</li><li>Als Helfer*in mit anpacken</li></ul><div className="mt-4 flex gap-2"><a href="#/teilnehmer" className="px-3 py-2 rounded-lg bg-black text-white text-sm font-semibold">Kurzbewerbung</a><a href={WHATSAPP_CHANNEL_URL} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg border border-neutral-300 text-sm hover:bg-neutral-100">WhatsApp-Kanal</a></div></div></div></section>;}

function Field({label,children,wide}:{label:string;children:React.ReactNode;wide?:boolean}){return <label className={"flex flex-col gap-1 "+(wide?"md:col-span-2":"")}><span className="text-sm text-neutral-700">{label}</span>{children}</label>;}
