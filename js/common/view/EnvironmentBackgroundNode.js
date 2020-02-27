// Copyright 2019-2020, University of Colorado Boulder

/**
 * EnvironmentBackgroundNode shows the background image that corresponds to the abiotic environment.
 * The image is scaled to fit the specified dimensions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import arcticBackgroundImage from '../../../images/arcticBackground_png.js';
import equatorBackgroundImage from '../../../images/equatorBackground_png.js';
import naturalSelection from '../../naturalSelection.js';
import Environments from '../model/Environments.js';

class EnvironmentBackgroundNode extends Node {

  /**
   * @param {EnumerationProperty.<Environments>} environmentProperty
   * @param {Dimension2} size - dimensions of the backgrounds, in view coordinates
   * @param {number} yHorizon - y coordinate of the horizon, in view coordinates
   * @param {Object} [options]
   */
  constructor( environmentProperty, size, yHorizon, options ) {

    options = merge( {}, options );

    // Equator background, scaled to fit
    const equatorBackground = new Image( equatorBackgroundImage );
    equatorBackground.setScaleMagnitude( size.width / equatorBackground.width, size.height / equatorBackground.height );

    // Arctic background, scaled to fit
    const arcticBackground = new Image( arcticBackgroundImage );
    arcticBackground.setScaleMagnitude( size.width / arcticBackground.width, size.height / arcticBackground.height );

    assert && assert( !options.children, 'EnvironmentBackgroundNode sets children' );
    options.children = [ equatorBackground, arcticBackground ];

    super( options );

    // Horizon line, for debugging. Bunnies cannot go further from the viewer than this line.
    if ( phet.chipper.queryParameters.dev ) {
      const horizonLine = new Line( 0, yHorizon, size.width, yHorizon, {
        stroke: 'red',
        lineWidth: 1
      } );
      this.addChild( horizonLine );
    }

    environmentProperty.link( climate => {
      equatorBackground.visible = ( climate === Environments.EQUATOR );
      arcticBackground.visible = ( climate === Environments.ARCTIC );
    } );
  }

  /**
   * @public
   * @override
   */
  dispose() {
    assert && assert( false, 'EnvironmentBackgroundNode does not support dispose' );
  }
}

naturalSelection.register( 'EnvironmentBackgroundNode', EnvironmentBackgroundNode );
export default EnvironmentBackgroundNode;