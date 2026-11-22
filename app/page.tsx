import Portfolio from './components/Portfolio';

export default function Home() {
  const localContact = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL_FROM && process.env.BLOB_READ_WRITE_TOKEN);
  return <Portfolio localContact={localContact}/>;
}
