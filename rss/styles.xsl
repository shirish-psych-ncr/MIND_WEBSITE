<!-- public/rss/styles.xsl -->
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <h2>Mind Grace Clinic RSS Feed</h2>
        <ul>
          <xsl:for-each select="rss/channel/item">
            <li>
              <a href="{link}"><xsl:value-of select="title"/></a>
              <p><xsl:value-of select="pubDate"/></p>
            </li>
          </xsl:for-each>
        </ul>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
