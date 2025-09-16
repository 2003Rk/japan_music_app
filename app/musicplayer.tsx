import MusicPlayerScreen from './src/musicplayer';

export default function MusicPlayer() {
  const handleNavigate = (route: any) => {
    // Handle navigation logic here
    console.log('Navigate to:', route);
  };
  
  return <MusicPlayerScreen onNavigate={handleNavigate} />;
}
