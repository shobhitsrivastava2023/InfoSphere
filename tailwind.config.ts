import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    darkMode: ["class"],
    content: ["./src/**/*.tsx"],
  theme: {
  	extend: {
		animation: {
			'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
			'star-movement-top': 'star-movement-top linear infinite alternate',
			'gradient-slow': 'gradient 15s ease infinite',		  },
		  keyframes: {
			'star-movement-bottom': {
			  '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
			  '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
			},
			'star-movement-top': {
			  '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
			  '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
			},
			gradient: {
				'0%, 100%': { backgroundPosition: '0% 50%' },
				'50%': { backgroundPosition: '100% 50%' },
			  }
		},
		backgroundImage: {
			'gradient-custom': 'linear-gradient(135deg, black 70%, rgb(76, 29, 149) 10%, rgb(30, 58, 138) 20%)',
		  },
		  backgroundSize: {
			'gradient-size': '200% 200%',
		  }, 

  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
                    ...fontFamily.sans
                ]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
