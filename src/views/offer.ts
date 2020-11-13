import Offer from '@src/models/Offer';
import moment from 'moment';

export interface OfferView {
  full_price: number;
  price_with_discount: number;
  discount_percentage: number;
  start_date: string;
  enrollment_semester: number;
  enabled: boolean;
  course: {
    name: string;
    kind: string;
    level: string;
    shift: string;
  };
  university: {
    name: string;
    score: number;
    logo_url: string;
  };
  campus: {
    name: string;
    city: string;
  };
}

const dateFormat = 'DD/MM/YYYY';

export default {
  render(offer: any): OfferView {
    return {
      full_price: offer.offers_full_price,
      price_with_discount: offer.offers_price_with_discount,
      discount_percentage: offer.offers_discount_percentage,
      start_date: moment(offer.offers_start_date).format(dateFormat),
      enrollment_semester: offer.offers_enrollment_semester,
      enabled: !!offer.offers_enabled,
      course: {
        name: offer.courses_name,
        kind: offer.courses_kind,
        level: offer.courses_level,
        shift: offer.courses_shift,
      },
      university: {
        name: offer.universities_name,
        score: offer.universities_score,
        logo_url: offer.universities_logo_url,
      },
      campus: {
        name: offer.campus_name,
        city: offer.campus_city,
      },
    };
  },

  renderMany(offer: Offer[]) {
    return offer.map((offer) => this.render(offer));
  },
};
