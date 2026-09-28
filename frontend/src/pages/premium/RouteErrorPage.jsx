import { Button, Title } from '../../components/premium/Ui';
export default function RouteErrorPage() { return <main className="premium-empty page-shell"><Title as={1}>This path could not be opened.</Title><p>The story may be unavailable, or StoryVerse could not reach the API.</p><Button onClick={() => window.location.assign('/')}>Return home</Button></main>; }
