/* jshint node: true, esversion: 6 */
const gulp = require( 'gulp' ),
	jshint = require( 'gulp-jshint' ),
	lesshint = require( 'gulp-lesshint' ),
	jsonlint = require( 'gulp-jsonlint' ),
	karma = require( 'karma' );

gulp.task( 'default', [ 'lint', 'test' ] );

gulp.task( 'lint:jshint', () =>
	gulp.src( [
		'plugins/nodebb-plugin-tdwtf-customizations/**/*.js',
		'plugins/nodebb-plugin-tdwtf-customizations/**/*.html',
		'gulpfile.js',
		'test/**/*.js',
		'test/**/*.html'
	] )
	.pipe( jshint.extract( 'auto' ) )
	.pipe( jshint() )
	.pipe( jshint.reporter( 'default', { verbose: true } ) )
	.pipe( jshint.reporter( 'fail' ) )
);

gulp.task( 'lint:lesshint', () =>
	gulp.src( [
		'plugins/nodebb-plugin-tdwtf-customizations/**/*.less',
		'test/**/*.less'
	] )
	.pipe( lesshint() )
	.pipe( lesshint.reporter() )
);

gulp.task( 'lint:jsonlint', () =>
	gulp.src( [
		'*.json',
		'.jshintrc',
		'.lesshintrc',
		'plugins/nodebb-plugin-tdwtf-customizations/**/*.json',
		'test/**/*.json'
	] )
	.pipe( jsonlint() )
	.pipe( jsonlint.reporter() )
);

gulp.task( 'lint', [ 'lint:jshint', 'lint:lesshint', 'lint:jsonlint' ] );

gulp.task( 'test:karma', done => {
	const configFile = `${__dirname}/test/karma.conf.js`;
	new karma.Server( { configFile }, ( error ) => {
		done( error );
	} )
	.start();
} );

gulp.task( 'test', [ 'test:karma' ] );
