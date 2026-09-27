function AstroTemplate() {
  return (
    <>
<!DOCTYPE html>
<html lang="en-IN" dir="ltr">
<head>
<Head />
{/* */}
</head>
<body className="expr" data-chrome-normalized="true" {...extraAttrs}>
{/* */}
<Shell />
<slot />
{/* */}
</body>
</html>

    </>
  );
}
export default AstroTemplate;
