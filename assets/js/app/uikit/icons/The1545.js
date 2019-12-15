import { h } from 'preact';

// `size` is used as the height of the text and uses the same values as a
// normal `font-size` property. The width will be 3 times the height.
const The1545 = props => {
  const { size, color = 'currentColor', className, ...passthroughProps } = props;

  const width = size != null ? size * 3 : undefined;
  const height = size != null ? size : undefined;

  return (
    <svg
      {...passthroughProps}
      class={className}
      width={width}
      height={height}
      viewBox="0 0 150 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="m7.436 40.478c0.84 0 1.848-0.378 3.948-0.462 1.008 0 1.722-0.21 2.73-1.512 5.628-7.35 14.238-20.076 17.01-24.528 3.78-0.588 6.93-1.05 8.484-1.26 0.336-0.042 0.504-0.168 0.504-0.336 0-0.294-0.378-0.546-1.386-1.218-0.84-0.546-1.554-0.924-2.688-0.924-1.386 0-3.234 0.084-5.25 0.21-0.756-0.504-1.512-0.966-2.058-1.26-0.756-0.378-0.966-0.336-1.386 0.294-0.21 0.336-0.462 0.756-0.84 1.302-3.234 0.294-6.3 0.63-7.77 0.882-1.89 0.294-2.52 0.84-3.234 1.722-0.462 0.588-0.756 1.596-1.302 2.814-0.168 0.336-0.042 0.504 0.672 0.378 2.688-0.462 5.712-0.966 8.694-1.428-6.804 9.954-13.02 19.236-16.38 24.822-0.252 0.42 0 0.504 0.252 0.504zm31.184-1.26c2.52 0 6.846-3.612 9.786-8.484l0.126-0.21c0.168-0.294 0.21-0.504-0.084-0.798l-0.126-0.126c-0.126-0.126-0.21-0.084-0.504 0.294l-0.126 0.168c-3.108 4.158-5.376 5.922-7.392 6.468 0.294-2.016 3.486-6.258 4.452-8.526 0.63-1.428 0.588-2.184-0.42-3.066-0.63-0.588-1.26-0.84-1.89-0.84-1.134 0-3.864 1.596-6.846 3.738 3.108-5.208 5.25-8.442 7.014-10.878 2.604-3.612 2.73-5.796 1.764-6.426-0.504-0.336-1.554-0.756-2.604-1.05-0.378-0.126-0.546-0.126-0.966 0.462-3.696 5.754-8.904 13.482-13.23 20.118-2.1 3.234-3.024 4.83-3.024 5.964 0 0.882 0.504 1.47 1.848 2.058 1.05 0.462 1.848 0.672 2.31 0.672 0.63 0 0.966-0.462 2.268-2.814 0.42-0.798 0.882-1.554 1.302-2.31 2.73-2.898 5.418-5.208 7.266-6.468-1.176 2.226-3.318 4.746-4.368 7.014-0.63 1.47-0.294 2.73 0.756 3.78 0.924 0.882 1.596 1.26 2.688 1.26zm12.832 0.21c3.192 0 6.594-1.47 8.988-4.074 0.378-0.378 0.546-1.134 0.546-1.554 0-0.252-0.042-0.42-0.21-0.42-0.084 0-0.168 0.042-0.336 0.168-2.982 2.436-5.502 3.108-7.896 3.108-0.462 0-0.882-0.042-1.26-0.168-0.294-0.42-0.294-1.092-0.126-1.89 2.982-1.008 5.25-2.016 6.72-2.94 2.814-1.806 3.57-3.024 3.57-4.284 0-0.882-0.63-1.848-1.428-2.478-0.378-0.546-0.714-0.756-1.344-1.176s-1.302-0.714-2.142-0.714c-2.73 0-6.552 2.394-8.736 5.25-3.066 4.032-2.52 6.72-1.05 8.442 1.806 2.142 3.108 2.73 4.704 2.73zm5.25-9.408c-1.134 0.84-2.856 1.722-4.746 2.52 1.47-2.898 4.578-6.006 6.888-6.51 0.42 1.47-0.588 2.856-2.142 3.99zm12.182 8.652c0.714 0 1.47-0.084 2.478-0.252 1.974-0.378 3.234-1.008 4.326-2.646 3.36-4.914 5.082-7.434 6.846-10.332 2.436-4.032 2.94-4.956 1.134-6.888-1.176-1.218-1.596-1.428-2.226-1.428-0.336 0-0.63 0.336-1.428 1.008-2.226 1.806-4.746 4.116-7.224 6.426-1.05 0.966-1.176 1.386-0.84 2.142 0.126 0.294 0.294 0.462 0.714 0.126 1.26-1.008 2.646-1.974 4.074-2.94-3.066 4.704-4.956 7.854-8.946 14.028-0.378 0.588 0 0.756 1.092 0.756zm12.025 6.888c6.51 0 14.952-5.082 15.078-11.676 0-0.882-0.126-1.764-0.504-2.562-0.84-1.932-2.31-3.738-6.594-4.074 0.798-1.176 1.596-2.352 2.352-3.486 2.814 0 5.838-0.168 8.064-0.378 2.4359-0.21 3.6959-1.26 4.6619-2.898 0.42-0.63 0.84-1.512 0.84-1.89 0-0.168 0-0.294-0.42-0.294-2.1 0-6.1739 0.21-9.9119 0.462 0.63-0.924 0.084-1.176-0.462-1.932-0.21-0.294-0.42-0.462-0.672-0.462-0.294 0-0.42 0.21-1.008 1.092-0.336 0.504-0.714 1.008-1.092 1.554-0.966 0.084-1.848 0.168-2.604 0.252-0.462 0-0.462 0.168-0.462 0.378 0 0.336 0.21 1.386 0.42 2.016 0.084 0.21 0.168 0.42 0.294 0.63-1.848 2.478-3.78 5.124-5.334 7.35-0.546 0.714-0.546 1.47-0.294 1.974 0.168 0.378 0.504 0.924 0.798 1.26 0.252 0.252 0.42 0.252 1.302-0.042 3.444-1.176 6.258-1.302 7.854-0.882-0.378 4.074-7.476 7.77-16.128 8.736-0.462 0.042-0.546 1.428 0.168 2.73 0.924 1.596 2.1 2.142 3.654 2.142zm20.681 0.756c0.546 0 2.268-0.336 3.612-0.504 1.092-0.21 1.596-0.714 2.436-1.722 1.302-1.722 3.024-4.2 4.872-6.888 0.756-0.042 1.428-0.126 2.058-0.168 1.47-0.126 2.352-0.588 2.856-1.722 0.546-1.218 1.26-2.184 1.26-2.562 0-0.168-0.084-0.294-0.756-0.252l-2.31 0.126c2.604-3.948 5.04-7.728 6.3-9.786 1.134-1.848 0.504-3.276-1.512-4.536-1.176-0.756-2.016-1.092-2.814-1.092-0.588 0-1.092 0.252-2.772 1.554-3.024 2.436-9.156 7.056-14.616 11.508-1.9325 1.596-2.4365 2.982-2.4365 4.368 0 0.462 0.168 1.386 0.336 1.974 0.21 0.756 0.63 1.092 1.9325 1.092 1.428 0 3.444-0.042 5.67-0.126-1.638 2.688-3.192 5.334-4.494 7.728-0.294 0.714-0.084 1.008 0.378 1.008zm0.504-13.482c4.704-4.494 9.996-9.198 14.784-12.558-2.52 3.612-5.46 8.064-8.274 12.558-2.52 0.042-4.872 0.042-6.51 0zm17.247 12.306c6.384 0 15.12-4.914 15.12-10.08 0-0.882-0.252-2.52-0.84-3.99-0.798-2.1-2.1-3.108-7.014-3.192 1.092-1.386 2.058-2.646 2.982-3.906 2.772 0 5.922-0.42 8.988-0.882 1.596-0.252 2.52-0.588 3.822-2.772 0.378-0.672 0.84-1.512 0.84-1.89 0-0.294-0.42-0.336-0.84-0.294-2.352 0.252-6.342 0.546-9.786 0.756 0-0.336-0.336-0.714-0.798-1.092-0.294-0.252-0.588-0.336-0.798-0.336-0.294 0-0.546 0.21-1.512 1.554-0.588 0.042-1.092 0.042-1.554 0.042-0.882 0-1.134 0.168-1.134 0.798s0.168 1.554 0.462 2.31c-1.68 2.352-3.444 4.998-5.208 7.644-0.504 0.714-0.672 1.68-0.336 2.1 0.294 0.378 0.714 0.672 1.092 0.924 0.336 0.168 0.546 0.252 1.428 0.042 2.982-0.714 6.132-0.63 7.686 0-1.05 3.654-8.232 6.888-16.128 7.77-0.756 0.084-0.672 1.386 0.042 2.688 0.924 1.596 1.932 1.806 3.486 1.806z"
        fill={color}
      />
      <path
        d="m11.384 40.016v-0.6h-0.012l-0.012 5e-4 0.024 0.5995zm2.73-1.512 0.4744 0.3673 2e-3 -0.0025-0.4764-0.3648zm17.01-24.528-0.0922-0.5929-0.2718 0.0423-0.1453 0.2335 0.5093 0.3171zm8.484-1.26-0.0744-0.5954-0.0059 8e-4 0.0803 0.5946zm-0.882-1.554 0.3328-0.4993-0.0058-0.0038-0.327 0.5031zm-7.938-0.714-0.3328 0.4992 0.1683 0.1123 0.2019-0.0127-0.0374-0.5988zm-2.058-1.26 0.2845-0.52828-8e-3 -0.00431-0.0082-0.00407-0.2683 0.53666zm-1.386 0.294-0.4992-0.33282-0.0049 0.00734-0.0047 0.00748 0.5088 0.318zm-0.84 1.302 0.0543 0.5975 0.2794-0.0254 0.1596-0.2306-0.4933-0.3415zm-7.77 0.882 0.0922 0.5929 0.0092-0.0015-0.1014-0.5914zm-3.234 1.722-0.4664-0.3776-0.0054 0.0069 0.4718 0.3707zm-1.302 2.814 0.5367 0.2683 0.0056-0.0113 0.0052-0.0116-0.5475-0.2454zm0.672 0.378-0.1016-0.5913-0.0027 4e-4 0.1043 0.5909zm8.694-1.428 0.4953 0.3386 0.7817-1.1436-1.3689 0.2121 0.0919 0.5929zm-16.38 24.822-0.51415-0.3093-3.5e-4 6e-4 0.5145 0.3087zm0.252 1.104c0.48554 0 1.02-0.1093 1.6018-0.2079 0.60538-0.1026 1.355-0.214 2.3702-0.2546l-0.048-1.199c-1.0848 0.0434-1.8892 0.163-2.5228 0.2704-0.65721 0.1114-1.0468 0.1911-1.4012 0.1911v1.2zm3.948-0.462c0.5464 0 1.0836-0.0562 1.6333-0.3311 0.542-0.271 1.038-0.725 1.5711-1.4136l-0.9488-0.7346c-0.4749 0.6134-0.8399 0.9154-1.1589 1.0749-0.3113 0.1556-0.6351 0.2044-1.0967 0.2044v1.2zm3.2064-1.7472c5.641-7.3671 14.262-20.109 17.043-24.576l-1.0186-0.6342c-2.763 4.4375-11.362 17.147-16.977 24.48l0.9528 0.7296zm16.626-24.3c3.7784-0.5878 6.9239-1.0491 8.4722-1.2583l-0.1607-1.1892c-1.5598 0.2108-4.7143 0.6735-8.4959 1.2617l0.1844 1.1858zm8.4662-1.2575c0.2173-0.0272 0.4494-0.0883 0.6435-0.2217 0.2137-0.147 0.3861-0.3911 0.3861-0.7097h-1.2c0-0.0625 0.0168-0.1274 0.0499-0.1843 0.0314-0.0539 0.0671-0.0831 0.0842-0.0949 0.0162-0.0111 0.0191-0.0092-2e-3 -0.0024-0.0203 0.0066-0.056 0.0154-0.1105 0.0222l0.1488 1.1908zm1.0296-0.9314c0-0.4405-0.2984-0.7344-0.5309-0.9282-0.2515-0.2096-0.6322-0.4623-1.1223-0.789l-0.6656 0.9984c0.5179 0.3453 0.8302 0.5546 1.0197 0.7125 0.2085 0.1737 0.0991 0.1528 0.0991 0.0063h1.2zm-1.659-1.7211c-0.8762-0.5695-1.7089-1.0209-3.015-1.0209v1.2c0.9619 0 1.5572 0.3046 2.361 0.8271l0.654-1.0062zm-3.015-1.0209c-1.4053 0-3.2684 0.08498-5.2874 0.21117l0.0748 1.1976c2.013-0.1258 3.8459-0.2088 5.2126-0.2088v-1.2zm-4.9172 0.31077c-0.7657-0.51049-1.5385-0.9833-2.1063-1.289l-0.569 1.0566c0.5242 0.28224 1.2634 0.73342 2.0097 1.2309l0.6656-0.99843zm-2.1225-1.2974c-0.1965-0.09828-0.3894-0.18584-0.5739-0.24063-0.1884-0.05596-0.4058-0.08952-0.637-0.04084-0.4654 0.09798-0.7422 0.4787-0.9426 0.77931l0.9984 0.66564c0.0986-0.14782 0.1612-0.22414 0.203-0.26411 0.0338-0.03237 0.0267-0.01465-0.0116-0.00658-0.0317 0.00667-0.0286-0.00588 0.0481 0.01691 0.0807 0.02396 0.1975 0.07289 0.379 0.16361l0.5366-1.0733zm-2.1631 0.51266c-0.2148 0.34366-0.4568 0.74731-0.8245 1.2785l0.9866 0.683c0.3883-0.5608 0.6503-0.9972 0.8555-1.3255l-1.0176-0.636zm-0.3855 1.0225c-3.2318 0.2938-6.3204 0.6315-7.8171 0.8881l0.2028 1.1828c1.4433-0.2475 4.4867-0.5817 7.7229-0.8759l-0.1086-1.195zm-7.8079 0.8866c-0.9878 0.1537-1.6984 0.3808-2.2695 0.7159-0.5754 0.3378-0.9654 0.7604-1.3386 1.2215l0.9326 0.755c0.3408-0.4209 0.6228-0.7123 1.0134-0.9416 0.3949-0.2318 0.9443-0.4247 1.8465-0.565l-0.1844-1.1858zm-3.6136 1.9442c-0.2864 0.3645-0.5016 0.8319-0.7014 1.3102-0.2109 0.5052-0.4062 1.0266-0.6763 1.6291l1.095 0.4908c0.2759-0.6155 0.5006-1.2071 0.6887-1.6575 0.1992-0.4771 0.362-0.8077 0.5376-1.0312l-0.9436-0.7414zm-1.3669 2.9164c-0.0571 0.1142-0.1274 0.2847-0.1295 0.4804-0.0026 0.2372 0.0985 0.4851 0.3326 0.6453 0.1898 0.1299 0.4043 0.1571 0.5578 0.1617 0.1667 5e-3 0.3531-0.0151 0.5521-0.0502l-0.2086-1.1818c-0.158 0.0279-0.2551 0.0341-0.3076 0.0325-0.0657-2e-3 -0.0061-0.0141 0.084 0.0475 0.0533 0.0365 0.108 0.0931 0.1456 0.1702 0.0365 0.0748 0.0445 0.1429 0.044 0.1877-8e-4 0.0736-0.0239 0.0971 3e-3 0.0433l-1.0734-0.5366zm1.3103 1.2376c2.686-0.4616 5.7066-0.965 8.6843-1.4264l-0.1838-1.1858c-2.9863 0.4626-6.0137 0.9672-8.7037 1.4296l0.2032 1.1826zm8.0971-2.3579c-6.8023 9.9515-13.028 19.248-16.399 24.851l1.0283 0.6186c3.3496-5.5686 9.5554-14.836 16.361-24.793l-0.9906-0.6772zm-16.399 24.852c-0.14327 0.2388-0.34542 0.7104-0.00405 1.1087 0.14114 0.1646 0.31871 0.2336 0.43741 0.2647 0.12316 0.0323 0.2422 0.0393 0.33314 0.0393v-1.2c-0.03506 0-0.04202-0.0035-0.02911-1e-4 0.00845 0.0022 0.09152 0.024 0.16966 0.1151 0.04144 0.0484 0.07235 0.1062 0.08911 0.1681 0.01623 0.0599 0.01537 0.109 0.01186 0.1389-0.00601 0.0511-0.01994 0.0509 0.02098-0.0173l-1.029-0.6174zm41.736-8.9313 0.5137 0.31 8e-4 -0.0013-0.5145-0.3087zm0.126-0.21 0.5146 0.3088 0.0063-0.0111-0.5209-0.2977zm-0.084-0.798 0.4243-0.4243-0.4243 0.4243zm-0.126-0.126-0.4243 0.4243 0.4243-0.4243zm-0.504 0.294-0.4737-0.3684-0.0063 0.0084 0.48 0.36zm-0.126 0.168-0.48-0.36-6e-4 8e-4 0.4806 0.3592zm-7.392 6.468-0.5937-0.0866-0.132 0.9047 0.8825-0.239-0.1568-0.5791zm4.452-8.526-0.549-0.2422-3e-3 0.0071 0.552 0.2351zm-0.42-3.066-0.4094 0.4386 7e-3 0.0066 0.0073 0.0063 0.3951-0.4515zm-8.736 2.898-0.5152-0.3075 0.8652 0.7948-0.35-0.4873zm7.014-10.878 0.486 0.3519 7e-4 -1e-3 -0.4867-0.3509zm1.764-6.426-0.3328 0.4993 5e-3 0.0033 0.3278-0.5026zm-2.604-1.05-0.1898 0.5692 0.0139 0.0046 0.0141 4e-3 0.1618-0.5778zm-0.966 0.462-0.4883-0.34875-0.0085 0.01204-8e-3 0.01244 0.5048 0.32427zm-13.23 20.118-0.5026-0.3277-6e-4 9e-4 0.5032 0.3268zm-1.176 8.022 0.2416-0.5492-0.0011-5e-4 -0.2405 0.5497zm4.578-2.142 0.525 0.2907 0.0059-0.0113-0.5309-0.2794zm1.302-2.31-0.4367-0.4114-0.0514 0.0545-0.0364 0.0655 0.5245 0.2914zm7.266-6.468 0.5305 0.2803-0.8685-0.776 0.338 0.4957zm-4.368 7.014-0.5445-0.2521-0.0036 0.0078-0.0034 0.0079 0.5515 0.2364zm0.756 3.78-0.4244 0.4244 0.0101 0.0096 0.4143-0.434zm2.688 1.86c0.7628 0 1.6034-0.2696 2.4533-0.707 0.8574-0.4413 1.7649-1.0743 2.6727-1.8524 1.8154-1.5562 3.6727-3.7272 5.1737-6.2146l-1.0274-0.62c-1.439 2.3846-3.2148 4.4556-4.9273 5.9234-0.8562 0.7339-1.6865 1.3084-2.4408 1.6966-0.7619 0.3921-1.407 0.574-1.9042 0.574v1.2zm10.3-8.7753 0.126-0.21-1.029-0.6174-0.126 0.21 1.029 0.6174zm0.1324-0.221c0.0928-0.1623 0.2226-0.4154 0.2098-0.7217-0.0139-0.3336-0.1861-0.5939-0.3904-0.7983l-0.8486 0.8486c0.0449 0.0449 0.0559 0.0659 0.0549 0.0641-9e-4 -0.0018-0.0046-0.0093-0.0082-0.022-0.0036-0.0129-6e-3 -0.0275-0.0066-0.0424-0.0013-0.0308 0.0056-0.0447 1e-3 -0.0316-0.0025 7e-3 -0.0073 0.0192-0.0163 0.0379-0.0091 0.0187-0.0212 0.0416-0.0375 0.07l1.0419 0.5954zm-0.1806-1.52-0.1261-0.126-0.8485 0.8486 0.126 0.126 0.8486-0.8486zm-0.126-0.126c-0.0549-0.0548-0.1766-0.1679-0.3634-0.2166-0.2196-0.0573-0.4127 9e-4 -0.5476 0.078-0.1166 0.0666-0.208 0.1567-0.2719 0.2255-0.0693 0.0746-0.1424 0.1646-0.219 0.263l0.9472 0.7368c0.0704-0.0906 0.118-0.1476 0.1511-0.1833 0.0385-0.0414 0.0311-0.0248-0.012-2e-4 -0.0262 0.015-0.0734 0.0375-0.1387 0.0494-0.0691 0.0126-0.142 0.0102-0.212-0.0081-0.0665-0.0173-0.1142-0.0447-0.1416-0.0634-0.0263-0.0179-0.0404-0.0322-0.0407-0.0325l0.8486-0.8486zm-1.4083 0.3583-0.126 0.168 0.96 0.72 0.126-0.168-0.96-0.72zm-0.1266 0.1688c-3.0916 4.136-5.2566 5.7574-7.0683 6.2481l0.3137 1.1582c2.2203-0.6013 4.5913-2.5079 7.7158-6.6879l-0.9612-0.7184zm-6.3177 6.9138c0.059-0.4047 0.2766-0.9765 0.6275-1.6836 0.3447-0.6944 0.7913-1.4677 1.2676-2.2633 0.9338-1.5598 2.0109-3.2465 2.5152-4.4306l-1.104-0.4702c-0.4617 1.0839-1.4636 2.6522-2.4408 4.2844-0.4792 0.8004-0.9461 1.6073-1.3128 2.3462-0.3604 0.7261-0.6521 1.4406-0.7401 2.0439l1.1874 0.1732zm4.4072-8.3704c0.3239-0.734 0.5291-1.4057 0.451-2.052-0.0823-0.6806-0.4607-1.2142-1.0248-1.7077l-0.7902 0.903c0.4439 0.3885 0.5904 0.6739 0.6237 0.9488 0.0374 0.3092-0.0514 0.7295-0.3576 1.4235l1.0979 0.4844zm-0.5595-3.7468c-0.7192-0.6713-1.4899-1.0014-2.2994-1.0014v1.2c0.4505 0 0.9398 0.1739 1.4806 0.6786l0.8188-0.8772zm-2.2994-1.0014c-0.3999 0-0.8692 0.1346-1.3498 0.325-0.4949 0.1962-1.0606 0.4759-1.6722 0.8166-1.2241 0.6818-2.6724 1.6305-4.1741 2.7091l0.7001 0.9746c1.4804-1.0634 2.8881-1.9837 4.058-2.6354 0.5854-0.3261 1.1012-0.5792 1.5303-0.7493 0.4434-0.1757 0.7406-0.2406 0.9077-0.2406v-1.2zm-6.3308 4.6455c3.102-5.1979 5.2341-8.4161 6.9848-10.834l-0.972-0.7038c-1.7774 2.4545-3.9292 5.7043-7.0432 10.922l1.0304 0.615zm6.9855-10.835c1.3261-1.8394 2.0592-3.3651 2.3201-4.5535 0.254-1.1574 0.0882-2.2021-0.715-2.726l-0.6556 1.0052c0.1628 0.1061 0.4169 0.4684 0.1985 1.4635-0.2116 0.9641-0.8435 2.3364-2.1214 4.109l0.9734 0.7018zm1.6101-7.2761c-0.584-0.38936-1.7073-0.82963-2.775-1.1286l-0.3236 1.1556c1.0323 0.289 2.009 0.6888 2.433 0.9714l0.6656-0.9984zm-2.7471-1.12c-0.1848-0.06162-0.5172-0.17238-0.8833-0.0232-0.3186 0.12977-0.5524 0.41414-0.7607 0.70566l0.9765 0.69745c0.0965-0.1351 0.1638-0.2152 0.211-0.2624 0.0464-0.04637 0.0535-0.04063 0.0259-0.0294-0.0148 6e-3 -0.0323 0.0107-0.0503 0.0128-0.0083 1e-3 -0.0152 0.0012-0.0201 0.0012-0.0049-1e-4 -0.0076-4e-4 -0.0075-4e-4 0.0083 1e-3 0.0386 0.0066 0.129 0.0367l0.3795-1.1384zm-1.6605 0.70694c-3.6979 5.7569-8.8908 13.462-13.228 20.115l1.0052 0.6554c4.315-6.6191 9.538-14.37 13.232-20.121l-1.0096-0.64857zm-13.228 20.115c-1.0485 1.6147-1.8196 2.8448-2.3282 3.8186-0.5028 0.9628-0.7926 1.7534-0.7926 2.4722h1.2c0-0.4152 0.1722-0.9896 0.6563-1.9168 0.4785-0.9162 1.2194-2.1011 2.2709-3.7204l-1.0064-0.6536zm-3.1208 6.2908c0 0.5743 0.1712 1.0875 0.5715 1.5379 0.3789 0.4262 0.9336 0.7625 1.636 1.0698l0.481-1.0994c-0.6417-0.2807-1.0109-0.5324-1.2201-0.7677-0.1876-0.2111-0.2684-0.4329-0.2684-0.7406h-1.2zm2.2063 2.6072c1.0659 0.469 1.9592 0.7228 2.5517 0.7228v-1.2c-0.3316 0-1.0342-0.1662-2.0684-0.6212l-0.4833 1.0984zm2.5517 0.7228c0.2407 0 0.4866-0.0465 0.7342-0.1877 0.2334-0.133 0.4308-0.3291 0.6175-0.564 0.3632-0.457 0.7983-1.2103 1.4412-2.3717l-1.0498-0.5812c-0.6591 1.1906-1.0431 1.8443-1.3308 2.2063-0.1388 0.1746-0.2249 0.241-0.2724 0.2681-0.0332 0.019-0.0656 0.0302-0.1399 0.0302v1.2zm2.7989-3.1346c0.4195-0.797 0.8557-1.5062 1.2956-2.298l-1.049-0.5828c-0.4001 0.7202-0.888 1.523-1.3085 2.322l1.0619 0.5588zm1.2078-2.178c2.7097-2.8764 5.3649-5.1548 7.1673-6.3837l-0.676-0.9914c-1.8937 1.2911-4.6144 3.6327-7.3647 6.5523l0.8734 0.8228zm6.2988-7.1597c-0.5682 1.0754-1.3732 2.2278-2.1963 3.4332-0.81 1.1863-1.6366 2.4229-2.1857 3.609l1.089 0.5042c0.5008-1.0819 1.2702-2.2393 2.0877-3.4365 0.8045-1.1781 1.6584-2.3987 2.2663-3.5493l-1.061-0.5606zm-4.389 7.0579c-0.3562 0.8313-0.4537 1.641-0.2869 2.411 0.1661 0.7664 0.5829 1.4424 1.1701 2.0297l0.8486-0.8486c-0.4628-0.4627-0.739-0.9417-0.8459-1.4353-0.1062-0.49-0.0567-1.0453 0.2171-1.684l-1.103-0.4728zm0.8932 4.4504c0.4791 0.4573 0.9306 0.8215 1.4324 1.0661 0.5139 0.2505 1.0471 0.3599 1.6699 0.3599v-1.2c-0.4693 0-0.818-0.0796-1.1441-0.2386-0.3382-0.1648-0.6847-0.4307-1.1296-0.8554l-0.8286 0.868zm24.922-3.038-0.4242-0.4243-0.0089 0.0089-0.0086 0.0093 0.4417 0.4061zm0-1.806-0.36-0.48-0.0099 0.0075-0.0096 0.0078 0.3795 0.4647zm-9.156 2.94-0.4915 0.3441 0.1137 0.1624 0.1881 0.0627 0.1897-0.5692zm-0.126-1.89-0.1921-0.5684-0.3244 0.1097-0.0706 0.3351 0.5871 0.1236zm6.72-2.94 0.3194 0.508 0.0047-3e-3 -0.3241-0.505zm2.142-6.762-0.4933 0.3415 0.0511 0.0738 0.0705 0.0556 0.3717-0.4709zm-1.344-1.176-0.3328 0.4992 0.3328-0.4992zm-10.878 4.536-0.4766-0.3645-1e-3 0.0013 0.4776 0.3632zm-1.05 8.442 0.4588-0.3868-0.0024-0.0028-0.4564 0.3896zm9.954-6.678-0.3536-0.4847-0.0035 0.0026 0.3571 0.4821zm-4.746 2.52-0.5351-0.2714-0.7414 1.4617 1.5099-0.6375-0.2334-0.5528zm6.888-6.51 0.577-0.1648-0.1547-0.5414-0.5502 0.12 0.1279 0.5862zm-7.392 13.998c3.366 0 6.9263-1.5449 9.4297-4.2679l-0.8834-0.8122c-2.2845 2.485-5.5282 3.8801-8.5463 3.8801v1.2zm9.4123-4.2497c0.2874-0.2875 0.4611-0.6765 0.5637-1.0084 0.105-0.3396 0.158-0.6934 0.158-0.9699h-1.2c0 0.1435-0.0309 0.3777-0.1044 0.6156-0.076 0.2456-0.1752 0.4236-0.2658 0.5141l0.8485 0.8486zm0.7217-1.9783c0-0.1349-0.0073-0.3467-0.0905-0.5409-0.0464-0.1083-0.1273-0.2374-0.267-0.3372-0.1445-0.1032-0.3055-0.1419-0.4525-0.1419v1.2c-0.063 0-0.1556-0.0177-0.245-0.0816-0.0846-0.0604-0.1235-0.1317-0.1384-0.1666-0.0138-0.0321-0.0133-0.0467-0.0109-0.0274 0.0022 0.017 0.0043 0.0472 0.0043 0.0956h1.2zm-0.81-1.02c-0.3076 0-0.5398 0.1709-0.696 0.288l0.72 0.96c0.0363-0.0272 0.0627-0.0458 0.0821-0.0586 0.0196-0.013 0.0272-0.0167 0.0258-0.016-0.0021 0.0011-0.0172 0.0084-0.0426 0.0152-0.0129 0.0033-0.0273 0.0063-0.0431 0.0084-0.0159 0.0021-0.0314 3e-3 -0.0462 3e-3v-1.2zm-0.7155 0.3033c-2.8786 2.3516-5.2656 2.9727-7.5165 2.9727v1.2c2.5371 0 5.1902-0.7229 8.2756-3.2433l-0.7591-0.9294zm-7.5165 2.9727c-0.4304 0-0.7783-0.0399-1.0702-0.1372l-0.3795 1.1384c0.4641 0.1547 0.9562 0.1988 1.4497 0.1988v-1.2zm-0.7684 0.0879c-0.0605-0.0864-0.1161-0.2364-0.1285-0.4886-0.0124-0.2507 0.0201-0.5632 0.0981-0.9337l-1.1743-0.2472c-0.09 0.4275-0.1416 0.85-0.1224 1.2398 0.0191 0.3883 0.1105 0.7843 0.344 1.1179l0.9831-0.6882zm-0.4254-0.9775c3.0011-1.0145 5.3196-2.0402 6.8471-3.0004l-0.6386-1.016c-1.4124 0.8878-3.6299 1.8781-6.5928 2.8796l0.3843 1.1368zm6.8519-3.0034c2.8397-1.8225 3.8459-3.1969 3.8459-4.789h-1.2c0 0.9278-0.5057 1.9895-3.294 3.779l0.6481 1.01zm3.8459-4.789c0-1.1362-0.7804-2.2576-1.6562-2.9489l-0.7435 0.9418c0.7202 0.5686 1.1997 1.3793 1.1997 2.0071h1.2zm-1.5346-2.8195c-0.4522-0.6531-0.8837-0.9198-1.5045-1.3337l-0.6657 0.9984c0.6392 0.4261 0.8797 0.5794 1.1835 1.0183l0.9867-0.683zm-1.5045-1.3337c-0.691-0.4607-1.4781-0.8148-2.4749-0.8148v1.2c0.6833 0 1.2402 0.2339 1.8092 0.6132l0.6657-0.9984zm-2.4749-0.8148c-1.5196 0-3.2682 0.6576-4.8847 1.6415-1.6274 0.9906-3.1866 2.3516-4.3279 3.844l0.9533 0.729c1.0427-1.3636 2.4864-2.6276 3.9986-3.548 1.523-0.9271 3.0504-1.4665 4.2607-1.4665v-1.2zm-9.2136 5.4868c-1.5784 2.0758-2.2774 3.8706-2.3477 5.4233-0.071 1.5679 0.5025 2.8149 1.319 3.7715l0.9127-0.7792c-0.6535-0.7654-1.088-1.7234-1.033-2.938 0.0557-1.2298 0.6167-2.795 2.1042-4.7512l-0.9552-0.7264zm-1.0311 9.192c0.9277 1.1002 1.7596 1.8427 2.5994 2.3066 0.8536 0.4716 1.6812 0.6366 2.5633 0.6366v-1.2c-0.7138 0-1.3352-0.129-1.9831-0.4869-0.6617-0.3656-1.3838-0.9881-2.2621-2.0299l-0.9175 0.7736zm10.056-7.5469c-1.0767 0.7975-2.747 1.6576-4.6222 2.4494l0.4667 1.1055c1.9048-0.8043 3.6785-1.7082 4.8698-2.5907l-0.7143-0.9642zm-3.8538 3.2735c0.701-1.3819 1.8028-2.8303 3.01-3.9918 1.2219-1.1758 2.4783-1.9868 3.4708-2.2034l-0.2558-1.1724c-1.3174 0.2874-2.7701 1.2824-4.0471 2.5111-1.2918 1.2429-2.479 2.7976-3.2481 4.3137l1.0702 0.5428zm5.776-6.6166c0.3055 1.0692-0.3899 2.2249-1.9187 3.3405l0.7073 0.9694c1.5792-1.1524 2.8998-2.7687 2.3653-4.6395l-1.1539 0.3296zm13.095 12.225 0.0986 0.5918 0.0071-0.0011 0.0071-0.0014-0.1128-0.5893zm4.326-2.646-0.4953-0.3387-0.0039 0.0059 0.4992 0.3328zm6.846-10.332 0.5125 0.312 1e-3 -0.0017-0.5135-0.3103zm1.134-6.888 0.4384-0.4098-0.0068-7e-3 -0.4316 0.4168zm-3.654-0.42 0.3781 0.466 0.0084-0.0071-0.3865-0.4589zm-7.224 6.426 0.4062 0.4416 0.0029-0.0027-0.4091-0.4389zm-0.84 2.142 0.5515-0.2364-0.0032-0.0073-0.5483 0.2437zm0.714 0.126 0.3748 0.4685-0.3748-0.4685zm4.074-2.94 0.5026 0.3276-0.8388-0.8246 0.3362 0.497zm-8.946 14.028-0.5039-0.3257-8e-4 0.0012 0.5047 0.3245zm1.092 1.356c0.7617 0 1.5547-0.0898 2.5766-0.2602l-0.1973-1.1836c-0.994 0.1656-1.7131 0.2438-2.3793 0.2438v1.2zm2.5908-0.2627c1.021-0.1955 1.9038-0.4644 2.6845-0.9222 0.788-0.4622 1.4394-1.0975 2.0279-1.9803l-0.9984-0.6656c-0.5035 0.7552-1.0281 1.2539-1.6366 1.6107-0.6158 0.3612-1.35 0.5963-2.3031 0.7788l0.2257 1.1786zm4.7085-2.8966c3.3574-4.9103 5.0893-7.4444 6.8632-10.359l-1.025-0.624c-1.7541 2.8817-3.4663 5.3876-6.8288 10.305l0.9906 0.6774zm6.8642-10.36c0.6067-1.0042 1.1046-1.8335 1.4757-2.5354 0.3695-0.6987 0.6359-1.3118 0.7558-1.8833 0.124-0.5915 0.0905-1.1357-0.1267-1.6783-0.2093-0.5229-0.5749-1.0071-1.046-1.511l-0.8766 0.8194c0.4319 0.4621 0.6806 0.8179 0.8085 1.1376 0.1202 0.3001 0.147 0.6011 0.0663 0.9861-0.0849 0.405-0.2884 0.8996-0.6421 1.5686-0.352 0.6657-0.8307 1.4639-1.442 2.4757l1.0271 0.6206zm1.0521-7.6151c-0.5901-0.6111-1.0336-1.0165-1.4336-1.2641-0.4382-0.2713-0.8133-0.3471-1.224-0.3471v1.2c0.2193 0 0.3692 0.0292 0.5924 0.1674 0.2616 0.1619 0.616 0.4705 1.2019 1.0774l0.8633-0.8336zm-2.6576-1.6112c-0.3838 0-0.6804 0.1999-0.9099 0.379-0.223 0.174-0.5397 0.4628-0.9046 0.7701l0.773 0.9178c0.4331-0.3647 0.6623-0.5799 0.8699-0.7419 0.201-0.1569 0.2194-0.125 0.1716-0.125v-1.2zm-1.806 1.1421c-2.244 1.8205-4.7777 4.1436-7.2551 6.453l0.8182 0.8778c2.4786-2.3106 4.9849-4.6075 7.1929-6.399l-0.756-0.9318zm-7.2522 6.4503c-0.5245 0.4825-0.919 0.913-1.095 1.3797-0.2006 0.5319-0.0846 1.0033 0.1129 1.4476l1.0966-0.4874c-0.1386-0.3117-0.1276-0.4283-0.0866-0.5369 0.0655-0.1738 0.259-0.4363 0.7845-0.9198l-0.8124-0.8832zm-0.9853 2.82c0.0612 0.1428 0.2219 0.5032 0.6085 0.6321 0.421 0.1403 0.7934-0.0832 1.0318-0.274l-0.7496-0.937c-0.0759 0.0606-0.1052 0.0694-0.0947 0.0657 0.0193-0.0068 0.0942-0.0257 0.192 0.0068 0.0919 0.0307 0.1368 0.0849 0.144 0.0943 0.0049 0.0062-0.0059-0.0066-0.029-0.0607l-1.103 0.4728zm1.6403 0.3581c1.2404-0.9923 2.6099-1.9473 4.0354-2.9115l-0.6724-0.994c-1.4305 0.9678-2.833 1.9448-4.1126 2.9685l0.7496 0.937zm3.1965-3.7361c-3.0533 4.6845-4.9811 7.8928-8.9472 14.03l1.0078 0.6514c4.0138-6.2109 5.8661-9.3026 8.9447-14.026l-1.0053-0.6552zm-8.948 14.031c-0.1137 0.1768-0.2359 0.4157-0.2377 0.6867-0.0023 0.3365 0.1774 0.5932 0.4178 0.7443 0.2016 0.1267 0.4419 0.1801 0.6511 0.2086 0.222 0.0302 0.4811 0.0409 0.7655 0.0409v-1.2c-0.2617 0-0.4593-0.0103-0.6035-0.0299-0.157-0.0214-0.1923-0.0468-0.1745-0.0356 0.0163 0.0103 0.0577 0.0407 0.0934 0.1008 0.0377 0.0636 0.0505 0.129 0.0502 0.1789-5e-4 0.0741-0.0283 0.0715 0.0471-0.0457l-1.0094-0.649zm28.7-3.7075 0.6 0.0115v-0.0115h-0.6zm-0.504-2.562-0.5502 0.2392 0.0038 0.0089 0.0042 0.0087 0.5422-0.2568zm-6.594-4.074-0.4965-0.3369-0.5797 0.8543 1.0293 0.0808 0.0469-0.5982zm2.352-3.486v-0.6h-0.3211l-0.1781 0.2672 0.4992 0.3328zm8.064-0.378-0.0515-0.5978-0.0048 5e-4 0.0563 0.5973zm4.6619-2.898-0.499-0.3328-9e-3 0.0138-9e-3 0.0142 0.517 0.3048zm-9.4919-1.722-0.4957-0.338-0.6952 1.0197 1.2313-0.0831-0.0404-0.5986zm-0.462-1.932-0.4882 0.3487 0.0018 0.0026 0.4864-0.3513zm-1.68 0.63 0.4992 0.3328-0.4992-0.3328zm-1.092 1.554 0.052 0.5977 0.2809-0.0244 0.1604-0.2318-0.4933-0.3415zm-2.604 0.252v0.6h0.0332l0.0331-0.0037-0.0663-0.5963zm-0.042 2.394-0.5692 0.1897 0.0056 0.0168 0.0065 0.0163 0.5571-0.2228zm0.294 0.63 0.481 0.3587 0.2405-0.3225-0.207-0.3449-0.5145 0.3087zm-5.334 7.35 0.4766 0.3645 0.0079-0.0104 0.0075-0.0106-0.492-0.3435zm-0.294 1.974 0.5483-0.2437-0.0055-0.0124-0.0061-0.0122-0.5367 0.2683zm0.798 1.26-0.4515 0.3951 0.0131 0.015 0.0141 0.0142 0.4243-0.4243zm1.302-0.042 0.1898 0.5692 0.0041-0.0014-0.1939-0.5678zm7.854-0.882 0.5974 0.0554 0.047-0.5062-0.4917-0.1294-0.1527 0.5802zm-16.128 8.736 0.0543 0.5977 0.0123-0.0014-0.0666-0.5963zm0.168 2.73-0.5262 0.2886 7e-3 0.012 0.5192-0.3006zm3.654 2.742c3.394 0 7.2517-1.3181 10.281-3.4766 3.0231-2.154 5.3287-5.2276 5.3967-8.7879l-1.1998-0.023c-0.0579 3.0337-2.0364 5.7981-4.8933 7.8336-2.8505 2.031-6.4688 3.2539-9.5848 3.2539v1.2zm15.678-12.276c0-0.9349-0.1329-1.9134-0.5617-2.8189l-1.0845 0.5137c0.3271 0.6906 0.4462 1.4761 0.4462 2.3052h1.2zm-0.5538-2.8012c-0.4448-1.0232-1.078-2.0614-2.2022-2.8811-1.1213-0.8176-2.6756-1.3778-4.8951-1.5519l-0.0938 1.1964c2.0645 0.1619 3.3872 0.6727 4.2819 1.3251 0.8918 0.6503 1.4136 1.4812 1.8088 2.3899l1.1004-0.4784zm-6.6477-3.4979c0.7977-1.1756 1.5971-2.3537 2.3547-3.4901l-0.9984-0.6656c-0.7544 1.1316-1.551 2.3055-2.3493 3.4819l0.993 0.6738zm1.8555-3.2229c2.8345 0 5.8774-0.1691 8.1204-0.3807l-0.1127-1.1946c-2.2091 0.2084-5.2142 0.3753-8.0077 0.3753v1.2zm8.1155-0.3802c1.2974-0.1118 2.3234-0.4518 3.1634-1.0121 0.839-0.5589 1.451-1.3099 1.964-2.1789l-1.034-0.6096c-0.453 0.769-0.953 1.362-1.595 1.7901-0.641 0.4267-1.463 0.7167-2.6014 0.8149l0.103 1.1956zm5.1094-3.163c0.228-0.342 0.454-0.7483 0.625-1.124 0.085-0.1881 0.161-0.3769 0.216-0.5522 0.052-0.1646 0.1-0.36 0.1-0.5466h-1.2c0-0.0047 0 9e-3 -7e-3 0.0462-7e-3 0.0354-0.019 0.0818-0.037 0.1396-0.037 0.116-0.093 0.258-0.165 0.4164-0.144 0.3173-0.338 0.667-0.53 0.955l0.998 0.6656zm0.941-2.2228c0-0.0172 0.032-0.3742-0.228-0.6343-0.241-0.241-0.579-0.2597-0.792-0.2597v1.2c0.081 0 0.106 0.0066 0.1 0.0052-7e-3 -0.0019-0.081-0.0209-0.157-0.0969-0.082-0.0827-0.111-0.1748-0.119-0.2219-4e-3 -0.0199-4e-3 -0.0317-4e-3 -0.0281v0.0357h1.2zm-1.02-0.894c-2.122 0-6.2147 0.2114-9.9522 0.4634l0.0807 1.1972c3.7384-0.252 7.7945-0.4606 9.8715-0.4606v-1.2zm-9.4162 1.4c0.1836-0.2692 0.3167-0.5391 0.3657-0.8202 0.0523-0.2993 0.0013-0.5644-0.1066-0.7982-0.0982-0.2129-0.243-0.3961-0.3613-0.5407-0.1308-0.1598-0.2466-0.2927-0.3691-0.4622l-0.9728 0.7026c0.1506 0.2085 0.3077 0.3906 0.4132 0.5195 0.1179 0.1442 0.1727 0.2235 0.2004 0.2836 0.0181 0.0392 0.0196 0.0576 0.0141 0.089-0.0086 0.0497-0.0436 0.1578-0.175 0.3506l0.9914 0.676zm-0.4694-2.6187c-0.2365-0.331-0.6029-0.7133-1.1603-0.7133v1.2c-0.0193 0-0.0233-0.0098 3e-3 9e-3 0.0354 0.0252 0.0956 0.0825 0.1808 0.2017l0.9765-0.6974zm-1.1603-0.7133c-0.1535 0-0.3177 0.0294-0.4826 0.118-0.1522 0.0817-0.2693 0.1949-0.3636 0.3032-0.1745 0.2004-0.3825 0.5203-0.661 0.938l0.9984 0.6656c0.3096-0.4643 0.4586-0.6904 0.5675-0.8155 0.0475-0.0545 0.0538-0.0488 0.0263-0.0341-0.0159 0.0085-0.0351 0.0159-0.0552 0.0205-0.019 0.0044-0.0306 0.0043-0.0298 0.0043v-1.2zm-1.5072 1.3592c-0.3376 0.5063-0.6851 0.9661-1.0861 1.5453l0.9866 0.683c0.355-0.5128 0.7635-1.061 1.0979-1.5627l-0.9984-0.6656zm-0.6448 1.2891c-0.9684 0.0842-1.8556 0.1686-2.6183 0.2534l0.1326 1.1926c0.7494-0.0832 1.6261-0.1668 2.5897-0.2506l-0.104-1.1954zm-2.552 0.2497c-0.2551 0-0.6194 0.0357-0.8623 0.3227-0.1223 0.1445-0.1671 0.3007-0.185 0.4132-0.0161 0.1011-0.0147 0.2012-0.0147 0.2421h1.2c0-0.0284 1e-4 -0.0428 5e-4 -0.0546 4e-4 -0.0109 8e-4 -0.0085-8e-4 0.0014-0.0034 0.0219-0.0193 0.0967-0.0839 0.173-0.0655 0.0774-0.1353 0.1026-0.1522 0.1075-0.0105 0.0031 0.0134-0.0053 0.0984-0.0053v-1.2zm-1.062 0.978c0 0.2369 0.0656 0.6391 0.1435 1.0185 0.0815 0.3966 0.1921 0.8417 0.3073 1.1872l1.1384-0.3794c-0.0948-0.2845-0.1942-0.6794-0.2702-1.0493-0.0796-0.3871-0.119-0.6779-0.119-0.777h-1.2zm0.4629 2.2388c0.0821 0.2052 0.1823 0.4587 0.3366 0.7159l1.029-0.6174c-0.0976-0.1628-0.1654-0.3293-0.2514-0.5441l-1.1142 0.4456zm0.3701 0.0485c-1.8499 2.4806-3.786 5.1321-5.345 7.3652l0.984 0.687c1.549-2.2189 3.4769-4.8594 5.323-7.3348l-0.962-0.7174zm-5.3296 7.3442c-0.6779 0.8866-0.7139 1.8872-0.3541 2.6068l1.0734-0.5366c-0.1442-0.2884-0.1801-0.7998 0.2339-1.3412l-0.9532-0.729zm-0.3657 2.5822c0.1898 0.4271 0.557 1.0254 0.8948 1.4114l0.9031-0.7902c-0.2503-0.286-0.5551-0.7797-0.7013-1.1086l-1.0966 0.4874zm0.922 1.4406c0.083 0.0829 0.1976 0.1852 0.3527 0.2588 0.1649 0.0783 0.334 0.1052 0.5035 0.1004 0.2894-0.0083 0.6404-0.1165 1.0598-0.2563l-0.3794-1.1384c-0.2179 0.0726-0.3781 0.1225-0.5015 0.1546-0.1262 0.0328-0.1874 0.0399-0.2132 0.0406-0.0142 4e-4 0.0105-0.0015 0.0455 0.0151 0.0252 0.0119 0.0242 0.0197-0.0188-0.0234l-0.8486 0.8486zm1.9202 0.1015c3.3828-1.1551 6.0682-1.2483 7.5074-0.8696l0.3054-1.1604c-1.7528-0.4613-4.6954-0.3025-8.2006 0.8944l0.3878 1.1356zm7.0627-1.5052c-0.1594 1.7173-1.7805 3.5256-4.647 5.0599-2.8225 1.5108-6.6831 2.6588-10.95 3.1352l0.1332 1.1926c4.3849-0.4896 8.3993-1.6726 11.383-3.2698 2.94-1.5737 5.0569-3.6504 5.2755-6.0071l-1.1948-0.1108zm-15.585 8.1939c-0.4536 0.0412-0.6796 0.4023-0.7728 0.6383-0.1013 0.2564-0.1359 0.5612-0.1298 0.8639 0.0126 0.6149 0.1971 1.3813 0.5988 2.1138l1.0522-0.577c-0.3123-0.5695-0.4428-1.1471-0.4512-1.5612-0.0043-0.2118 0.024-0.3427 0.0461-0.3987 0.0302-0.0764-0.0121 0.0957-0.2347 0.1159l-0.1086-1.195zm-0.2969 3.6281c0.5035 0.8697 1.0998 1.4934 1.8182 1.8932 0.7169 0.399 1.5074 0.5482 2.355 0.5482v-1.2c-0.7064 0-1.2809-0.1238-1.7715-0.3968-0.4891-0.2722-0.9427-0.7195-1.3632-1.4458l-1.0385 0.6012zm28.466 2.0934 0.074 0.5954 0.019-0.0025 0.02-0.0037-0.113-0.5892zm2.436-1.722 0.46 0.3841 0.01-0.0109 8e-3 -0.0113-0.478-0.3619zm4.872-6.888-0.034-0.5991-0.294 0.0164-0.167 0.2428 0.495 0.3399zm2.058-0.168 0.039 0.5988 0.012-1e-3 -0.051-0.5978zm2.856-1.722-0.548-0.2454-1e-3 0.0017 0.549 0.2437zm0.504-2.814 0.032 0.5991 5e-3 -3e-4 -0.037-0.5988zm-2.31 0.126-0.501-0.3304-0.656 0.9944 1.189-0.0649-0.032-0.5991zm6.3-9.786-0.512-0.3138v5e-4l0.512 0.3133zm-1.512-4.536-0.325 0.5047 7e-3 0.0041 0.318-0.5088zm-5.586 0.462-0.368-0.4743-9e-3 7e-3 0.377 0.4673zm-14.616 11.508-0.3797-0.465-0.0029 0.0024 0.3826 0.4626zm-2.1005 6.342 0.5781-0.1606-0.0012-0.0042-0.5769 0.1648zm7.6025 0.966 0.512 0.3122 0.581-0.9539-1.116 0.0421 0.023 0.5996zm-4.494 7.728-0.528-0.2867-0.015 0.0284-0.012 0.0299 0.555 0.2284zm0.882-12.474-0.415-0.4338-1.043 0.9966 1.442 0.037 0.016-0.5998zm14.784-12.558 0.492 0.3433-0.837-0.8344 0.345 0.4911zm-8.274 12.558 0.01 0.5999 0.325-0.0054 0.173-0.2761-0.508-0.3184zm-7.014 14.082c0.332 0 0.958-0.0953 1.6-0.1963 0.673-0.1061 1.426-0.2299 2.086-0.3123l-0.149-1.1908c-0.684 0.0856-1.464 0.2138-2.124 0.3177-0.692 0.109-1.2 0.1817-1.413 0.1817v1.2zm3.725-0.5148c0.627-0.1207 1.113-0.3336 1.561-0.6726 0.429-0.3247 0.804-0.7527 1.222-1.2545l-0.921-0.7682c-0.422 0.5062-0.719 0.8342-1.025 1.066-0.287 0.2175-0.599 0.3616-1.064 0.4509l0.227 1.1784zm2.801-1.9493c1.312-1.7347 3.041-4.224 4.888-6.91l-0.989-0.6798c-1.849 2.69-3.564 5.1567-4.856 6.866l0.957 0.7238zm4.427-6.6508c0.389-0.0217 0.756-0.054 1.098-0.0856 0.346-0.0319 0.661-0.0625 0.966-0.0828l-0.079-1.1974c-0.325 0.0217-0.661 0.0541-0.997 0.0852-0.341 0.0314-0.688 0.0621-1.055 0.0824l0.067 1.1982zm2.076-0.1693c0.78-0.0669 1.467-0.227 2.041-0.5627 0.589-0.3442 1.015-0.8462 1.312-1.5134l-1.097-0.4874c-0.207 0.4668-0.474 0.7628-0.82 0.9646-0.36 0.2103-0.849 0.3442-1.539 0.4033l0.103 1.1956zm3.352-2.0744c0.26-0.5791 0.559-1.0985 0.811-1.5484 0.122-0.2186 0.239-0.4317 0.326-0.6181 0.075-0.1616 0.176-0.4007 0.176-0.6409h-1.2c0-0.0512 0.011-0.0278-0.065 0.1361-0.064 0.1391-0.16 0.3145-0.284 0.5369-0.242 0.4321-0.573 1.0047-0.859 1.6436l1.095 0.4908zm1.313-2.8074c0-0.0848-9e-3 -0.2372-0.094-0.3964-0.091-0.1731-0.234-0.2872-0.386-0.3555-0.253-0.1136-0.576-0.1201-0.914-0.0989l0.075 1.1976c0.151-0.0094 0.251-0.0081 0.314-0.0028 0.068 0.0056 0.066 0.0137 0.032-0.0016-0.046-0.0211-0.127-0.0748-0.182-0.1783-0.047-0.0897-0.045-0.1633-0.045-0.1641h1.2zm-1.389-0.8511-2.31 0.126 0.065 1.1982 2.31-0.126-0.065-1.1982zm-1.777 1.0555c2.605-3.949 5.046-7.736 6.311-9.8031l-1.023-0.6266c-1.255 2.0489-3.686 5.8219-6.289 9.7689l1.001 0.6608zm6.311-9.8026c0.631-1.029 0.825-2.0396 0.478-3.0051-0.334-0.9312-1.129-1.6944-2.183-2.3535l-0.636 1.0176c0.961 0.6009 1.489 1.1817 1.69 1.7415 0.189 0.5255 0.131 1.1529-0.372 1.9719l1.023 0.6276zm-1.699-5.3545c-1.203-0.7733-2.164-1.1873-3.138-1.1873v1.2c0.621 0 1.34 0.258 2.489 0.9967l0.649-1.0094zm-3.138-1.1873c-0.831 0-1.5 0.4089-3.14 1.6797l0.735 0.9485c1.72-1.3331 2.059-1.4282 2.405-1.4282v-1.2zm-3.149 1.6867c-1.506 1.2137-3.788 2.9722-6.386 4.9916-2.594 2.0164-5.497 4.288-8.2327 6.5187l0.7587 0.93c2.724-2.2213 5.617-4.4857 8.21-6.5013 2.589-2.0126 4.886-3.7821 6.403-5.0044l-0.753-0.9346zm-14.622 11.513c-1.011 0.8352-1.6805 1.6418-2.0947 2.4524-0.4173 0.8166-0.5592 1.6059-0.5592 2.3782h1.2c0-0.6137 0.1101-1.2104 0.4278-1.8323 0.3209-0.6279 0.8693-1.3123 1.7907-2.0731l-0.7646-0.9252zm-2.6539 4.8306c0 0.5413 0.184 1.5259 0.3591 2.1388l1.1538-0.3296c-0.1609-0.5631-0.3129-1.4265-0.3129-1.8092h-1.2zm0.3579 2.1346c0.1274 0.4587 0.3498 0.8944 0.8232 1.1818 0.4382 0.266 1.0055 0.3496 1.6874 0.3496v-1.2c-0.6211 0-0.9147-0.0844-1.0646-0.1754-0.1146-0.0696-0.2072-0.1799-0.2898-0.4772l-1.1562 0.3212zm2.5106 1.5314c1.437 0 3.461-0.0422 5.692-0.1264l-0.045-1.1992c-2.221 0.0838-4.229 0.1256-5.647 0.1256v1.2zm5.157-1.0382c-1.641 2.6925-3.2 5.3477-4.509 7.7535l1.055 0.5734c1.295-2.3822 2.844-5.019 4.479-7.7025l-1.025-0.6244zm-4.536 7.8118c-0.161 0.3905-0.268 0.8468-0.087 1.2471 0.214 0.4739 0.681 0.5893 1.02 0.5893v-1.2c-0.058 0-0.061-0.0099-0.035 0.0028 0.015 0.0072 0.037 0.0206 0.059 0.0428 0.023 0.0226 0.039 0.0478 0.05 0.0712 0.02 0.045 7e-3 0.0572 0.014 0.0012 6e-3 -0.0558 0.028-0.1521 0.088-0.2976l-1.109-0.4568zm1.851-11.812c4.698-4.4878 9.964-9.1669 14.714-12.501l-0.689-0.9822c-4.826 3.3862-10.143 8.1151-14.854 12.615l0.829 0.8676zm13.877-13.335c-2.526 3.6211-5.471 8.0815-8.29 12.583l1.017 0.6368c2.809-4.4866 5.744-8.9302 8.258-12.533l-0.985-0.6866zm-7.791 12.301c-2.516 0.0419-4.859 0.0418-6.485 1e-4l-0.031 1.1996c1.65 0.0423 4.011 0.0422 6.536 1e-4l-0.02-1.1998zm25.027-1.1641-0.561 0.2132 4e-3 0.0096 0.557-0.2228zm-7.014-3.192-0.472-0.3713-0.748 0.9505 1.209 0.0207 0.011-0.5999zm2.982-3.906v-0.6h-0.304l-0.18 0.2452 0.484 0.3548zm8.988-0.882 0.089 0.5933 4e-3 -6e-4 -0.093-0.5927zm3.822-2.772 0.515 0.3072 8e-3 -0.013-0.523-0.2942zm0-2.184-0.06-0.597-4e-3 4e-4 0.064 0.5966zm-9.786 0.756h-0.6v0.6377l0.636-0.0388-0.036-0.5989zm-0.798-1.092-0.391 0.4557 0.011 0.0087 0.38-0.4644zm-2.31 1.218 0.043 0.5985 0.28-0.0201 0.164-0.2282-0.487-0.3502zm-2.226 3.15 0.488 0.3487 0.189-0.2639-0.118-0.3023-0.559 0.2175zm-5.208 7.644 0.49 0.346 5e-3 -0.0065 4e-3 -0.0067-0.499-0.3328zm-0.336 2.1 0.473-0.3684-5e-3 -0.0064-0.468 0.3748zm1.092 0.924-0.333 0.4992 0.031 0.0208 0.033 0.0167 0.269-0.5367zm1.428 0.042 0.139 0.5837v-2e-4l-0.139-0.5835zm7.686 0 0.576 0.1657 0.15-0.5189-0.501-0.2028-0.225 0.556zm-16.128 7.77 0.066 0.5963-0.066-0.5963zm0.042 2.688-0.526 0.2886 6e-3 0.012 0.52-0.3006zm3.486 2.406c3.325 0 7.214-1.2719 10.273-3.1948 1.534-0.9639 2.884-2.1068 3.856-3.3636 0.972-1.2557 1.591-2.6573 1.591-4.1216h-1.2c0 1.1187-0.474 2.2686-1.339 3.3872-0.865 1.1175-2.098 2.1717-3.547 3.0821-2.904 1.8256-6.575 3.0107-9.634 3.0107v1.2zm15.72-10.68c0-0.9595-0.267-2.673-0.883-4.2128l-1.114 0.4456c0.56 1.4002 0.797 2.9627 0.797 3.7672h1.2zm-0.879-4.2031c-0.432-1.137-1.038-2.0602-2.254-2.6745-1.167-0.5891-2.836-0.862-5.311-0.9043l-0.021 1.1998c2.439 0.0417 3.878 0.3148 4.791 0.7757 0.862 0.4357 1.307 1.0665 1.673 2.0295l1.122-0.4262zm-7.104-2.6076c1.095-1.3897 2.065-2.6554 2.995-3.9225l-0.968-0.7096c-0.919 1.2529-1.88 2.5072-2.97 3.8895l0.943 0.7426zm2.511-3.6773c2.822 0 6.012-0.4269 9.077-0.8887l-0.179-1.1866c-3.067 0.4622-6.176 0.8753-8.898 0.8753v1.2zm9.081-0.8893c0.814-0.1285 1.551-0.2903 2.257-0.7523 0.702-0.4598 1.315-1.1774 1.987-2.3052l-1.031-0.6144c-0.629 1.0562-1.129 1.5986-1.614 1.9158-0.481 0.315-1.004 0.4472-1.786 0.5707l0.187 1.1854zm4.252-3.0705c0.188-0.3348 0.407-0.7292 0.58-1.0912 0.086-0.181 0.166-0.3648 0.226-0.5367 0.055-0.1602 0.111-0.3599 0.111-0.5563h-1.2c0-0.0074-2e-3 0.0396-0.045 0.1643-0.039 0.1129-0.099 0.252-0.175 0.4122-0.153 0.3205-0.353 0.6821-0.543 1.0193l1.046 0.5884zm0.917-2.1842c0-0.2346-0.091-0.4479-0.254-0.6062-0.147-0.1422-0.32-0.2108-0.454-0.2465-0.263-0.0703-0.56-0.0615-0.792-0.0383l0.119 1.194c0.087-0.0086 0.166-0.0121 0.233-0.0103 0.07 0.0018 0.112 9e-3 0.131 0.014 0.023 0.0063-0.019 7e-4 -0.074-0.0522-0.03-0.0292-0.06-0.0695-0.081-0.1203s-0.028-0.098-0.028-0.1342h1.2zm-1.504-0.8906c-2.338 0.2505-6.317 0.5438-9.759 0.7537l0.073 1.1978c3.446-0.2101 7.447-0.5048 9.814-0.7583l-0.128-1.1932zm-9.122 1.3526c0-0.3625-0.177-0.6706-0.351-0.8967-0.182-0.2357-0.421-0.4579-0.667-0.6597l-0.76 0.9288c0.215 0.1762 0.375 0.3319 0.477 0.4638 0.109 0.1414 0.101 0.1903 0.101 0.1638h1.2zm-1.008-1.5476c-0.394-0.3379-0.824-0.4804-1.188-0.4804v1.2c0.056 0 0.214 0.0255 0.407 0.1916l0.781-0.9112zm-1.188-0.4804c-0.158 0-0.324 0.031-0.497 0.1189-0.158 0.0805-0.298 0.1966-0.432 0.3298-0.26 0.26-0.591 0.6874-1.07 1.3551l0.974 0.7004c0.486-0.6763 0.764-1.0259 0.945-1.2069 0.042-0.0422 0.074-0.0695 0.096-0.0867 0.022-0.0171 0.032-0.0221 0.031-0.0219-2e-3 9e-4 -0.01 0.0049-0.024 0.0081-0.014 0.0031-0.023 0.0032-0.023 0.0032v-1.2zm-1.555 1.5555c-0.564 0.0403-1.049 0.0405-1.511 0.0405v1.2c0.461 0 0.985 2e-4 1.597-0.0435l-0.086-1.197zm-1.511 0.0405c-0.429 0-0.895 0.0296-1.241 0.2705-0.422 0.2941-0.493 0.7555-0.493 1.1275h1.2c0-0.1248 0.013-0.1757 0.018-0.188 1e-3 -3e-3 -2e-3 0.0049-0.011 0.0172-0.01 0.013-0.02 0.0225-0.028 0.0278-0.011 8e-3 9e-3 -0.0105 0.108-0.0277 0.099-0.0171 0.241-0.0273 0.447-0.0273v-1.2zm-1.734 1.398c0 0.7099 0.184 1.7075 0.503 2.5275l1.118-0.435c-0.269-0.692-0.421-1.5424-0.421-2.0925h-1.2zm0.574 1.9613c-1.687 2.3613-3.457 5.0158-5.219 7.6599l0.998 0.6656c1.765-2.6479 3.524-5.2854 5.197-7.6281l-0.976-0.6974zm-5.21 7.6467c-0.304 0.4298-0.507 0.9345-0.585 1.4089-0.073 0.4444-0.057 1.0034 0.27 1.4119l0.937-0.7496c1e-3 8e-4 -0.022-0.0287-0.035-0.1173-0.012-0.0866-0.012-0.2054 0.012-0.3503 0.048-0.2921 0.18-0.6274 0.381-0.9116l-0.98-0.692zm-0.32 2.8144c0.361 0.4642 0.859 0.8058 1.233 1.0548l0.666-0.9984c-0.383-0.255-0.725-0.5014-0.952-0.7932l-0.947 0.7368zm1.297 1.0923c0.182 0.0905 0.405 0.1991 0.732 0.2243 0.3 0.0231 0.646-0.0264 1.104-0.1353l-0.278-1.1674c-0.425 0.1011-0.624 0.1146-0.734 0.1062-0.083-0.0063-0.132-0.0237-0.287-0.1012l-0.537 1.0734zm1.836 0.0888c1.442-0.3453 2.927-0.4977 4.235-0.4875 1.32 0.0102 2.41 0.1857 3.086 0.46l0.451-1.112c-0.877-0.3557-2.139-0.5372-3.528-0.548-1.401-0.0108-2.983 0.1518-4.523 0.5205l0.279 1.167zm6.97-0.7492c-0.22 0.7648-0.778 1.56-1.672 2.3468-0.891 0.7834-2.082 1.5294-3.504 2.2008-2.845 1.3429-6.548 2.3569-10.442 2.7918l0.133 1.1926c4.003-0.4471 7.838-1.4911 10.821-2.8992 1.492-0.7041 2.786-1.5069 3.784-2.3851 0.995-0.8748 1.728-1.8541 2.033-2.9163l-1.153-0.3314zm-15.618 7.3394c-0.388 0.0431-0.69 0.2583-0.868 0.5731-0.162 0.2862-0.205 0.6208-0.195 0.9294 0.019 0.6221 0.26 1.3664 0.646 2.0703l1.052-0.577c-0.328-0.5981-0.487-1.1558-0.499-1.5312-6e-3 -0.1902 0.028-0.2782 0.04-0.3004 4e-3 -0.0062-1e-3 0.0042-0.019 0.0162-0.018 0.0124-0.031 0.013-0.024 0.0122l-0.133-1.1926zm-0.411 3.5849c0.507 0.8742 1.074 1.4312 1.781 1.7483 0.685 0.3075 1.436 0.3571 2.225 0.3571v-1.2c-0.765 0-1.296-0.0554-1.734-0.2519-0.417-0.1869-0.815-0.5329-1.233-1.2547l-1.039 0.6012z"
        fill={color}
      />
    </svg>
  );
};

export default The1545;
