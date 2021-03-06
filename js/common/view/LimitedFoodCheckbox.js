// Copyright 2019-2020, University of Colorado Boulder

/**
 * LimitedFoodCheckbox is a checkbox for enabling the 'Limited Food' environmental factor.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import AlignGroup from '../../../../scenery/js/nodes/AlignGroup.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import naturalSelection from '../../naturalSelection.js';
import naturalSelectionStrings from '../../naturalSelectionStrings.js';
import NaturalSelectionColors from '../NaturalSelectionColors.js';
import NaturalSelectionConstants from '../NaturalSelectionConstants.js';
import EnvironmentalFactorCheckbox from './EnvironmentalFactorCheckbox.js';

class LimitedFoodCheckbox extends EnvironmentalFactorCheckbox {

  /**
   * @param {Property.<boolean>} limitedFoodProperty
   * @param {AlignGroup} alignGroup
   * @param {Object} [options]
   */
  constructor( limitedFoodProperty, alignGroup, options ) {

    assert && AssertUtils.assertPropertyOf( limitedFoodProperty, 'boolean' );
    assert && assert( alignGroup instanceof AlignGroup, 'invalid alignGroup' );

    options = merge( {

      // EnvironmentalFactorCheckbox options
      clockSliceRange: NaturalSelectionConstants.CLOCK_FOOD_RANGE,
      clockSliceColor: NaturalSelectionColors.CLOCK_FOOD_SLICE_COLOR
    }, options );

    const labelNode = new Text( naturalSelectionStrings.limitedFood, {
      font: NaturalSelectionConstants.CHECKBOX_FONT,
      maxWidth: 150 // determined empirically
    } );

    super( limitedFoodProperty, labelNode, alignGroup, options );
  }
}

naturalSelection.register( 'LimitedFoodCheckbox', LimitedFoodCheckbox );
export default LimitedFoodCheckbox;