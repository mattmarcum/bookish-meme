import { helper } from '@ember/component/helper';

export default helper(function stopPropagation([fn]) {
  return function(event) {
    event.stopPropagation();
    return fn(event);
  };
});
