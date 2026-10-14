const {expect} = require('chai');
const {getPluginAsset} = require('../src/util');

describe('Get Plugin Asset', ()=>{
    it('skips the sourcemap bundle', ()=>{
        const release = {assets: [{name: 'FlexibleLayouts-1.12.3-srcmap.zip'}, {name: 'FlexibleLayouts-1.12.3.zip'}]};
        expect(getPluginAsset(release).name).to.equal('FlexibleLayouts-1.12.3.zip');
    });

    it('skips assets that are not zips', ()=>{
        const release = {assets: [{name: 'plugin.json'}, {name: 'DuetEddyAlign-1.0.0.zip'}]};
        expect(getPluginAsset(release).name).to.equal('DuetEddyAlign-1.0.0.zip');
    });

    it('returns undefined if the release holds no plugin zip', ()=>{
        const release = {assets: [{name: 'ClosedLoopTuning-3.7.0-srcmap.zip'}, {name: 'Source code (tar.gz)'}]};
        expect(getPluginAsset(release)).to.equal(undefined);
    });

    it('returns undefined for a release without assets', ()=>{
        expect(getPluginAsset({})).to.equal(undefined);
        expect(getPluginAsset(undefined)).to.equal(undefined);
    });
});
