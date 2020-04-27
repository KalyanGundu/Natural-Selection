// Copyright 2019-2020, University of Colorado Boulder

/**
 * PedigreeNode is the parent for all parts of the 'Pedigree' view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../../dot/js/Dimension2.js';
import merge from '../../../../../phet-core/js/merge.js';
import HBox from '../../../../../scenery/js/nodes/HBox.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import naturalSelection from '../../../naturalSelection.js';
import PedigreeModel from '../../model/PedigreeModel.js';
import NaturalSelectionConstants from '../../NaturalSelectionConstants.js';
import AllelesPanel from './AllelesPanel.js';
import PedigreeGraphNode from './PedigreeGraphNode.js';

class PedigreeNode extends HBox {

  /**
   * @param {PedigreeModel} pedigreeModel
   * @param {Dimension2} size - dimensions of the rectangle available for this Node and its children
   * @param {Object} [options]
   */
  constructor( pedigreeModel, size, options ) {

    assert && assert( pedigreeModel instanceof PedigreeModel, 'invalid pedigreeModel' );
    assert && assert( size instanceof Dimension2, 'invalid size' );

    options = merge( {

      // HBox options
      spacing: NaturalSelectionConstants.SCREEN_VIEW_X_SPACING,
      align: 'center',

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioDocumentation: 'the Pedigree graph and its control panel'
    }, options );

    // Divy up the width
    // If ?allelesVisible=false, the control panel is omitted, and the graph fills the width.
    const controlPanelWidth = 0.2 * size.width;
    const graphWidth = NaturalSelectionConstants.ALLELES_VISIBLE ?
                       size.width - controlPanelWidth - NaturalSelectionConstants.SCREEN_VIEW_X_SPACING :
                       size.width;

    // Because it's instrumented for PhET-iO, the AllelesPanel must be instantiated regardless of the value
    // of ?allelesVisible. If ?allelesVisible=false, it will not be added to the scenegraph, but will
    // still appear in the Studio element tree.
    const allelesPanel = new AllelesPanel( pedigreeModel, {
      fixedWidth: controlPanelWidth,
      maxHeight: size.height,
      tandem: options.tandem.createTandem( 'allelesPanel' ),
      phetioDocumentation: 'Note that if query parameter allelesVisible=false is specified, this panel will be ' +
                           'created but will not be added to the UI. It will appear in the API and Studio tree, ' +
                           'but changes to its elements and metadata will have no affect.'
    } );

    const pedigreeGraphNode = new PedigreeGraphNode( pedigreeModel, {
      graphWidth: graphWidth,
      graphHeight: size.height,
      tandem: options.tandem.createTandem( 'pedigreeGraphNode' )
    } );

    assert && assert( !options.children, 'PedigreeNode sets children' );
    options.children = NaturalSelectionConstants.ALLELES_VISIBLE ?
      [ allelesPanel, pedigreeGraphNode ] :
      [ pedigreeGraphNode ];

    super( options );

    // Create a link to the model that this Node displays
    this.addLinkedElement( pedigreeModel, {
      tandem: options.tandem.createTandem( 'pedigreeModel' )
    } );
  }

  /**
   * @public
   * @override
   */
  dispose() {
    assert && assert( false, 'PedigreeNode does not support dispose' );
  }
}

naturalSelection.register( 'PedigreeNode', PedigreeNode );
export default PedigreeNode;