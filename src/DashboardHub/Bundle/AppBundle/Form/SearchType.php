<?php

namespace DashboardHub\Bundle\AppBundle\Form;

use DashboardHub\Bundle\AppBundle\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Security\Core\SecurityContextInterface;

/**
 * Class SearchType
 * @package DashboardHub\Bundle\AppBundle\Form
 */
class SearchType extends AbstractType
{

    /**
     * @return string
     */
    public function getName()
    {
        return 'search';
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(
            array(
                'data_class' => 'DashboardHub\Bundle\AppBundle\Entity\Search'
            )
        );
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('query',
                  null,
                  array(
                    'attr' => array(
                        'placeholder' => 'Search Dashboards',
                    ),
                    'label' => false
                  )
            )
            ->add(
                'search',
                'submit',
                array(
                    'label' => 'Go'
                )
            );
    }
}
