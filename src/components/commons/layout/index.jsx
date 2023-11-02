import LayoutNavigation from './navigation/LayoutNavigation.container';

export default function Layout(props) {
  return (
    <>
      <LayoutNavigation />
      {props.children}
    </>
  );
}
