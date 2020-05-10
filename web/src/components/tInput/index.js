import styled from 'styled-components';
import { Input } from '@rocketseat/unform';

export default styled(Input)`
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

  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};

  &::placeholder {
    color: #999;
    font-size: 12px;
    text-transform: none;
  }

  &:disabled {
    background: #eee;
  }
`;
