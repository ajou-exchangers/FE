import * as S from './LayoutNavigation.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobeAmericas,
  faUser,
  faBell,
} from '@fortawesome/free-solid-svg-icons';

export default function LayoutNavigationUI(props) {
  return (
    <S.Navigation>
      <S.NavigationLeft>
        <FontAwesomeIcon icon={faGlobeAmericas} style={{ color: '#fcfcfc' }} />
        <S.NavigationTitle>Exchangers</S.NavigationTitle>
      </S.NavigationLeft>
      <S.NavigationList>
        <S.NavigationItem>
          <S.NavigationLink to="/campus">Campus</S.NavigationLink>
        </S.NavigationItem>
        <S.NavigationItem>
          <S.NavigationLink to="/boards">Board</S.NavigationLink>
        </S.NavigationItem>
        <S.NavigationItem>
          <FontAwesomeIcon icon={faBell} style={{ color: '#fcfcfc' }} />
        </S.NavigationItem>
        <S.NavigationItem>
          <S.NavigationLink to="/myPage">
            <FontAwesomeIcon icon={faUser} style={{ color: '#fcfcfc' }} />
          </S.NavigationLink>
        </S.NavigationItem>
      </S.NavigationList>
    </S.Navigation>
  );
}
