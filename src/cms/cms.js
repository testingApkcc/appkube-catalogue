import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import BlogPostPreview from './preview-templates/BlogPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import CataloguePagePreview from './preview-templates/CataloguePagePreview';
import DashboardPreviewPage from './preview-templates/DashboardPreviewPage';
import CatalogueDataPreview from './preview-templates/CatalogueDataPreview';

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('catalogue', CataloguePagePreview);
CMS.registerPreviewTemplate('dashboardpreview', DashboardPreviewPage);
CMS.registerPreviewTemplate('cataloguedata', CatalogueDataPreview);
