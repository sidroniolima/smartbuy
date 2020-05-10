import styles from 'styled-components';
import { Select } from '@rocketseat/unform';

export default styles(Select)`
background: #efefef;
border: 0;
border-radius: 4px;
height: 44px;
width: ${props => props.size};
padding: 0 10px;
background: #fff;
border: 1px solid #719192;
margin-right: 12px;
font-size: 14px;
outline: 0;

  option {
    color: #666;
    font-size: 14px;
  }
`;
