// Copyright 2019-2020, University of Colorado Boulder

/**
 * PopulationPanel is the panel that contains controls for the 'Population' graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../../scenery/js/nodes/VBox.js';
import Checkbox from '../../../../../sun/js/Checkbox.js';
import HSeparator from '../../../../../sun/js/HSeparator.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import naturalSelection from '../../../naturalSelection.js';
import naturalSelectionStrings from '../../../naturalSelectionStrings.js';
import PopulationModel from '../../model/PopulationModel.js';
import NaturalSelectionColors from '../../NaturalSelectionColors.js';
import NaturalSelectionConstants from '../../NaturalSelectionConstants.js';
import NaturalSelectionPanel from '../NaturalSelectionPanel.js';
import PopulationLegendCheckbox from './PopulationLegendCheckbox.js';

class PopulationPanel extends NaturalSelectionPanel {

  /**
   * @param {PopulationModel} populationModel
   * @param {Object} [options]
   */
  constructor( populationModel, options ) {

    assert && assert( populationModel instanceof PopulationModel, 'invalid populationModel' );

    options = merge( {
      fixedWidth: 100,
      xMargin: 0,

      // phet-io
      tandem: Tandem.REQUIRED
    }, NaturalSelectionConstants.PANEL_OPTIONS, options );

    const furGene = populationModel.genePool.furGene;
    const earsGene = populationModel.genePool.earsGene;
    const teethGene = populationModel.genePool.teethGene;

    // Total checkbox
    const totalCheckbox =
      new PopulationLegendCheckbox( populationModel.totalVisibleProperty, naturalSelectionStrings.total, {
        color: NaturalSelectionColors.POPULATION_TOTAL_COUNT,
        tandem: options.tandem.createTandem( 'totalCheckbox' )
      } );

    // A checkbox for each allele
    const whiteFurCheckbox = new PopulationLegendCheckbox( populationModel.whiteFurVisibleProperty, furGene.normalAllele.name, {
      color: furGene.color,
      tandem: options.tandem.createTandem( 'whiteFurCheckbox' )
    } );

    const brownFurCheckbox = new PopulationLegendCheckbox( populationModel.brownFurVisibleProperty, furGene.mutantAllele.name, {
      color: furGene.color,
      isMutant: true,
      tandem: options.tandem.createTandem( 'brownFurCheckbox' )
    } );

    const straightEarsCheckbox = new PopulationLegendCheckbox( populationModel.straightEarsVisibleProperty, earsGene.normalAllele.name, {
      color: earsGene.color,
      tandem: options.tandem.createTandem( 'straightEarsCheckbox' )
    } );

    const floppyEarsCheckbox = new PopulationLegendCheckbox( populationModel.floppyEarsVisibleProperty, earsGene.mutantAllele.name, {
      color: earsGene.color,
      isMutant: true,
      tandem: options.tandem.createTandem( 'floppyEarsCheckbox' )
    } );

    const shortTeethCheckbox = new PopulationLegendCheckbox( populationModel.shortTeethVisibleProperty, teethGene.normalAllele.name, {
      color: teethGene.color,
      tandem: options.tandem.createTandem( 'shortTeethCheckbox' )
    } );

    const longTeethCheckbox = new PopulationLegendCheckbox( populationModel.longTeethVisibleProperty, teethGene.mutantAllele.name, {
      color: teethGene.color,
      isMutant: true,
      tandem: options.tandem.createTandem( 'longTeethCheckbox' )
    } );

    const checkboxes = new VBox( merge( {}, NaturalSelectionConstants.VBOX_OPTIONS, {
      children: [
        totalCheckbox,
        whiteFurCheckbox,
        brownFurCheckbox,
        straightEarsCheckbox,
        floppyEarsCheckbox,
        shortTeethCheckbox,
        longTeethCheckbox
      ]
    } ) );

    // Dilate the pointer areas to fill vertical space between the checkboxes.
    // See https://github.com/phetsims/natural-selection/issues/173
    const yDilation = NaturalSelectionConstants.VBOX_OPTIONS.spacing / 2;
    checkboxes.children.forEach( checkbox => {
      checkbox.touchArea = checkbox.localBounds.dilatedXY( 4, yDilation );
      checkbox.mouseArea = checkbox.localBounds.dilatedXY( 4, yDilation );
    } );

    const separator = new HSeparator( options.fixedWidth - 2 * options.xMargin, {
      stroke: NaturalSelectionColors.SEPARATOR_STROKE,
      tandem: options.tandem.createTandem( 'separator' )
    } );

    // Data Probe checkbox
    const dataProbeCheckboxLabel = new Text( naturalSelectionStrings.dataProbe, {
      font: NaturalSelectionConstants.CHECKBOX_FONT,
      maxWidth: 135 // determined empirically
    } );
    const dataProbeCheckbox = new Checkbox( dataProbeCheckboxLabel, populationModel.dataProbe.visibleProperty,
      merge( {}, NaturalSelectionConstants.CHECKBOX_OPTIONS, {
        tandem: options.tandem.createTandem( 'dataProbeCheckbox' )
      } ) );

    const content = new VBox( merge( {}, NaturalSelectionConstants.VBOX_OPTIONS, {
      children: [
        checkboxes,
        separator,
        dataProbeCheckbox
      ]
    } ) );

    super( content, options );

    // @public for configuring ScreenViews only
    this.whiteFurCheckbox = whiteFurCheckbox;
    this.brownFurCheckbox = brownFurCheckbox;
    this.straightEarsCheckbox = straightEarsCheckbox;
    this.floppyEarsCheckbox = floppyEarsCheckbox;
    this.shortTeethCheckbox = shortTeethCheckbox;
    this.longTeethCheckbox = longTeethCheckbox;
  }

  /**
   * @public
   * @override
   */
  dispose() {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

naturalSelection.register( 'PopulationPanel', PopulationPanel );
export default PopulationPanel;