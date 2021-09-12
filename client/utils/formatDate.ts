import 'intl';
import 'intl/locale-data/jsonp/en';

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
